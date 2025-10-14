import fs from 'fs';
import path from 'path';
import { describe, it } from 'bun:test';

import { buildServer, expectResponse, req, ENDPOINT } from './helpers';

const route = ENDPOINT;

describe('route handling', async () => {
    it('returns Response', async () => {
        const { app, jhx } = buildServer();

        jhx({
            route,
            handler: () => new Response('route-ok'),
        });

        const res = await app.fetch(req());
        await expectResponse(res, 'route-ok', 'text/html');
    });

    it('returns JSX (default)', async () => {
        const { app, jhx } = buildServer();

        jhx({
            route,
            handler: () => <div>route-ok</div>,
        });

        const res = await app.fetch(req());
        await expectResponse(res, '<div>route-ok</div>', 'text/html');
    });

    it('returns JSX (config.render=static)', async () => {
        const { app, jhx } = buildServer({
            render: 'static',
        });

        jhx({
            route,
            handler: () => <div>route-ok</div>,
        });

        const res = await app.fetch(req());
        await expectResponse(res, '<div>route-ok</div>', 'text/html');
    });

    it('returns JSX (config.render=string)', async () => {
        const { app, jhx } = buildServer({
            render: 'string',
        });

        jhx({
            route,
            handler: () => <div>route-ok</div>,
        });

        const res = await app.fetch(req());
        await expectResponse(res, '<div>route-ok</div>', 'text/html');
    });

    it('returns JSX (config.render=false)', async () => {
        const { app, jhx } = buildServer({
            render: false,
        });

        jhx({
            route,
            handler: () => <div>route-ok</div>,
        });

        const res = await app.fetch(req());
        await expectResponse(res, '{"type":"div","key":null,"props":{"children":"route-ok"},"_owner":null,"_store":{}}', 'text/html');
    });

    it('returns buffer (config.contentType=null)', async () => {
        const { app, jhx } = buildServer({
            contentType: null,
        });

        jhx({
            route,
            handler: () => Buffer.from('route-ok', 'utf-8'),
        });

        const res = await app.fetch(req());
        await expectResponse(res, 'route-ok', 'application/octet-stream');
    });

    it('returns buffer (response header set)', async () => {
        const { app, jhx } = buildServer();

        jhx({
            route,
            handler: (ctx) => {
                ctx.set.headers['content-type'] = 'application/octet-stream';
                return Buffer.from('route-ok', 'utf-8');
            },
        });

        const res = await app.fetch(req());
        await expectResponse(res, 'route-ok', 'application/octet-stream');
    });

    it('returns buffer (fs.readFile; config.contentType=null)', async () => {
        const { app, jhx } = buildServer({
            contentType: null,
        });

        jhx({
            route,
            handler: async () => {
                const filepath = path.join(__dirname, 'data.txt');
                return await fs.promises.readFile(filepath);
            },
        });

        const res = await app.fetch(req());
        await expectResponse(res, 'file-data', 'application/octet-stream');
    });

    it('returns stream (ReadableStream)', async () => {
        const { app, jhx } = buildServer();

        jhx({
            route,
            handler: () => {
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
                    status: 200,
                    headers: { 'content-type': 'text/plain; charset=utf-8' },
                });
            },
        });

        const res = await app.fetch(req());
        await expectResponse(res, 'stream-ok', 'text/plain');
    });

    it('returns string', async () => {
        const { app, jhx } = buildServer();

        jhx({
            route,
            handler: () => 'route-ok',
        });

        const res = await app.fetch(req());
        await expectResponse(res, 'route-ok', 'text/html');
    });

    it('returns object (config.contentType=null)', async () => {
        const { app, jhx } = buildServer({
            contentType: null,
        });

        jhx({
            route,
            handler: () => ({ message: 'route-ok' }),
        });

        const res = await app.fetch(req());
        await expectResponse(res, { message: 'route-ok' }, 'application/json');
    });

    it('returns object (response header set)', async () => {
        const { app, jhx } = buildServer();

        jhx({
            route,
            handler: (context) => {
                context.set.headers['content-type'] = 'application/json; charset=utf-8';
                return { message: 'route-ok' }
            },
        });

        const res = await app.fetch(req());
        await expectResponse(res, { message: 'route-ok' }, 'application/json');
    });

    it('returns void', async () => {
        const { app, jhx } = buildServer();

        jhx({
            route,
            handler: () => {},
        });

        const res = await app.fetch(req());
        await expectResponse(res, '', 'text/html');
    });

    it('throws error', async () => {
        const { app, jhx } = buildServer();

        jhx({
            route,
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await app.fetch(req());
        await expectResponse(res, 'Unexpected jhx route error', 'text/html', 500);
    });
});
