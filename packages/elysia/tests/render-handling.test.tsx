import fs from 'fs';
import path from 'path';
import { describe, it } from 'bun:test';

import { buildServer, expectResponse, req, ENDPOINT } from './helpers';

const route = ENDPOINT;

describe('render handling', async () => {
    it('returns Response', async () => {
        const { app, jhx } = buildServer({
            render: (payload) => new Response(payload + '-rendered'),
        });

        jhx({ route, handler: () => 'response' });

        const res = await app.fetch(req());
        await expectResponse(res, 'response-rendered', 'text/html');
    });

    it('returns buffer (config.contentType=null)', async () => {
        const { app, jhx } = buildServer({
            contentType: null,
            render: (payload) => Buffer.from(payload + '-rendered', 'utf-8'),
        });

        jhx({ route, handler: () => 'response' });

        const res = await app.fetch(req());
        await expectResponse(res, 'response-rendered', 'application/octet-stream');
    });

    it('returns buffer (response header set)', async () => {
        const { app, jhx } = buildServer({
            render: (payload, ctx) => {
                ctx.set.headers['content-type'] = 'application/octet-stream';
                return Buffer.from(payload + '-rendered', 'utf-8');
            },
        });

        jhx({ route, handler: () => 'response' });

        const res = await app.fetch(req());
        await expectResponse(res, 'response-rendered', 'application/octet-stream');
    });

    it('returns buffer (fs.readFile; config.contentType=null)', async () => {
        const { app, jhx } = buildServer({
            contentType: null,
            render: async () => {
                const filepath = path.join(__dirname, 'data.txt');
                return await fs.promises.readFile(filepath);
            }
        });

        jhx({ route, handler: () => 'response' });

        const res = await app.fetch(req());
        await expectResponse(res, 'file-data', 'application/octet-stream');
    });

    it('returns stream (ReadableStream)', async () => {
        const { app, jhx } = buildServer({
            render: () => {
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
            }
        });

        jhx({ route, handler: () => 'response' });

        const res = await app.fetch(req());
        await expectResponse(res, 'stream-ok', 'text/plain');
    });

    it('returns string', async () => {
        const { app, jhx } = buildServer({
            render: (payload) => payload + '-rendered',
        });

        jhx({ route, handler: () => 'response' });

        const res = await app.fetch(req());
        await expectResponse(res, 'response-rendered', 'text/html');
    });

    it('returns object (config.contentType=null)', async () => {
        const { app, jhx } = buildServer({
            contentType: null,
            render: (payload) => ({ message: payload + '-rendered' }),
        });

        jhx({ route, handler: () => 'response' });

        const res = await app.fetch(req());
        await expectResponse(res, { message: 'response-rendered' }, 'application/json');
    });

    it('returns object (response header set)', async () => {
        const { app, jhx } = buildServer({
            render: (payload, ctx) => {
                ctx.set.headers['content-type'] = 'application/json';
                return { message: payload + '-rendered' }
            },
        });

        jhx({ route, handler: () => 'response' });

        const res = await app.fetch(req());
        await expectResponse(res, { message: 'response-rendered' }, 'application/json');
    });

    it('returns void', async () => {
        const { app, jhx } = buildServer({
            render: () => {},
        });

        jhx({ route, handler: () => 'response' });

        const res = await app.fetch(req());
        await expectResponse(res, '', 'text/html');
    });

    it('throws error', async () => {
        const { app, jhx } = buildServer({
            render: () => {
                throw new Error('render-error');
            },
        });

        jhx({ route, handler: () => 'response' });

        const res = await app.fetch(req());
        await expectResponse(res, 'Unexpected jhx route error', 'text/html', 500);
    });
});
