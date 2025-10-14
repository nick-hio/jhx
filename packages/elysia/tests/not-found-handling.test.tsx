import fs from 'fs';
import path from 'path';
import { describe, it } from 'bun:test';

import { buildServer, expectResponse, req } from './helpers';

describe('not found handling', async () => {
    it('returns Response', async () => {
        const { app } = buildServer({
            notFoundHandler: () => new Response('dne', {
                status: 404,
                headers: { 'content-type': 'text/plain; charset=utf-8' },
            }),
        });

        const res = await app.fetch(req());
        await expectResponse(res, 'dne', 'text/plain', 404);
    });

    it('returns JSX (default)', async () => {
        const { app } = buildServer({
            notFoundHandler: () => <div>dne</div>,
        });

        const res = await app.fetch(req());
        await expectResponse(res, '<div>dne</div>', 'text/html', 404);
    });

    it('returns JSX (config.render=static)', async () => {
        const { app } = buildServer({
            render: 'static',
            notFoundHandler: () => <div>dne</div>,
        });

        const res = await app.fetch(req());
        await expectResponse(res, '<div>dne</div>', 'text/html', 404);
    });

    it('returns JSX (config.render=string)', async () => {
        const { app } = buildServer({
            render: 'string',
            notFoundHandler: () => <div>dne</div>,
        });

        const res = await app.fetch(req());
        await expectResponse(res, '<div>dne</div>', 'text/html', 404);
    });

    it('returns JSX (config.renderNotFound=false)', async () => {
        const { app } = buildServer({
            renderNotFound: false,
            notFoundHandler: () => <div>dne</div>,
        });

        const res = await app.fetch(req());
        await expectResponse(res, '{"type":"div","key":null,"props":{"children":"dne"},"_owner":null,"_store":{}}', 'text/html', 404);
    });

    it('returns buffer (config.contentType=null)', async () => {
        const { app } = buildServer({
            contentType: null,
            notFoundHandler: () => Buffer.from('dne', 'utf-8'),
        });

        const res = await app.fetch(req());
        await expectResponse(res, 'dne', 'application/octet-stream', 404);
    });

    it('returns buffer (response header set)', async () => {
        const { app } = buildServer({
            notFoundHandler: (ctx) => {
                ctx.set.headers['content-type'] = 'application/octet-stream';
                return Buffer.from('dne', 'utf-8');
            },
        });

        const res = await app.fetch(req());
        await expectResponse(res, 'dne', 'application/octet-stream', 404);
    });

    it('returns buffer (fs.readFile; config.contentType=null)', async () => {
        const { app } = buildServer({
            contentType: null,
            notFoundHandler: async () => {
                const filepath = path.join(__dirname, 'data.txt');
                return await fs.promises.readFile(filepath);
            },
        });

        const res = await app.fetch(req());
        await expectResponse(res, 'file-data', 'application/octet-stream', 404);
    });

    it('returns stream (ReadableStream)', async () => {
        const { app } = buildServer({
            notFoundHandler: () => {
                const encoder = new TextEncoder();
                const chunks = ['stream', '-', 'ok'];
                let index = 0;
                const stream = new ReadableStream<Uint8Array>({
                    pull(controller) {
                        if (index < chunks.length) {
                            const chunk = chunks[index++];
                            controller.enqueue(encoder.encode(chunk));
                        } else {
                            controller.close();
                        }
                    },
                });
                return new Response(stream, {
                    status: 404,
                    headers: { 'content-type': 'text/plain; charset=utf-8' },
                });
            },
        });

        const res = await app.fetch(req());
        await expectResponse(res, 'stream-ok', 'text/plain', 404);
    });

    it('returns string', async () => {
        const { app } = buildServer({
            render: 'string',
            notFoundHandler: () => 'dne',
        });

        const res = await app.fetch(req());
        await expectResponse(res, 'dne', 'text/html', 404);
    });

    it('returns object (config.contentType=null)', async () => {
        const { app } = buildServer({
            contentType: null,
            notFoundHandler: () => ({ message: 'dne' }),
        });

        const res = await app.fetch(req());
        await expectResponse(res, { message: 'dne' }, 'application/json', 404);
    });

    it('returns object (response header set)', async () => {
        const { app } = buildServer({
            contentType: null,
            notFoundHandler: (context) => {
                context.set.headers['content-type'] = 'application/json; charset=utf-8';
                return { message: 'dne' }
            },
        });

        const res = await app.fetch(req());
        await expectResponse(res, { message: 'dne' }, 'application/json', 404);
    });

    it('returns void', async () => {
        const { app } = buildServer({
            notFoundHandler: () => {},
        });

        const res = await app.fetch(req());
        await expectResponse(res, '', 'text/html', 404);
    });
});
