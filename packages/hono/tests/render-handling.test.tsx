import path from 'path';
import { describe, it } from 'bun:test';
import { stream } from 'hono/streaming';

import { buildServer, expectResponse, testReq, ENDPOINT } from './helpers';
import { Readable } from 'stream';

const route = ENDPOINT;

describe('render handling', async () => {
    it('returns Hono context', async () => {
        const { app, jhx } = buildServer({
            render: (_payload, c) => c as any,
        });

        jhx({ route, handler: () => 'response' });

        const res = await app.request(testReq());
        await expectResponse(res, { finalized: false }, 'application/json', 200);
    });

    it('returns Response', async () => {
        const { app, jhx } = buildServer({
            render: (payload) => new Response(payload + '-rendered'),
        });

        jhx({ route, handler: () => 'response' });

        const res = await app.request(testReq());
        await expectResponse(res, 'response-rendered', null);
    });

    it('returns buffer (config.contentType=null)', async () => {
        const { app, jhx } = buildServer({
            contentType: null,
            render: (payload) => Buffer.from(payload + '-rendered', 'utf-8'),
        });

        jhx({ route, handler: () => 'response' });

        const res = await app.request(testReq());
        await expectResponse(res, 'response-rendered', 'application/octet-stream');
    });

    it('returns buffer (response header set)', async () => {
        const { app, jhx } = buildServer({
            render: (payload, c) => {
                c.header('content-type', 'application/octet-stream');
                return Buffer.from(payload + '-rendered', 'utf-8');
            },
        });

        jhx({ route, handler: () => 'response' });

        const res = await app.request(testReq());
        await expectResponse(res, 'response-rendered', 'application/octet-stream');
    });

    it('returns blob (config.contentType=null)', async () => {
        const { app, jhx } = buildServer({
            contentType: null,
            render: () => Bun.file(path.join(__dirname, 'data.txt')),
        });

        jhx({ route, handler: () => 'response' });

        const res = await app.request(testReq());
        await expectResponse(res, 'file-data', 'text/plain;charset=utf-8');
    });

    it('returns stream (ReadableStream)', async () => {
        const { app, jhx } = buildServer({
            render: () => {
                const encoder = new TextEncoder();
                const chunks = ['stream', '-', 'ok'];
                let index = 0;
                return new ReadableStream<Uint8Array>({
                    pull(controller) {
                        if (index < chunks.length) {
                            const chunk = chunks[index++];
                            controller.enqueue(encoder.encode(chunk));
                        } else {
                            controller.close();
                        }
                    },
                });
            },
        });

        jhx({ route, handler: () => 'response' });

        const res = await app.request(testReq());
        await expectResponse(res, 'stream-ok', 'text/html');
    });

    it('returns stream (NodeJS.Stream)', async () => {
        const { app, jhx } = buildServer({
            render: () => {
                const stream = new Readable();
                stream.push('stream');
                stream.push('-');
                stream.push('ok');
                stream.push(null);
                return stream;
            },
        });

        jhx({ route, handler: () => 'response' });

        const res = await app.request(testReq());
        await expectResponse(res, 'stream-ok', 'text/html');
    });

    it('returns stream (HonoStream)', async () => {
        const { app, jhx } = buildServer({
            render: (payload, c) => {
                return stream(c, async (stream) => {
                    await stream.write(`${payload}-rendered`)
                })
            },
        });

        jhx({ route, handler: () => 'response' });

        const res = await app.request(testReq());
        await expectResponse(res, 'response-rendered', 'text/html');
    });

    it('returns string', async () => {
        const { app, jhx } = buildServer({
            render: (payload) => payload + '-rendered',
        });

        jhx({ route, handler: () => 'response' });

        const res = await app.request(testReq());
        await expectResponse(res, 'response-rendered', 'text/html');
    });

    it('returns object (config.contentType=null)', async () => {
        const { app, jhx } = buildServer({
            contentType: null,
            render: (payload) => ({ message: payload + '-rendered' }),
        });

        jhx({ route, handler: () => 'response' });

        const res = await app.request(testReq());
        await expectResponse(res, { message: 'response-rendered' }, 'application/json');
    });

    it('returns object (response header set)', async () => {
        const { app, jhx } = buildServer({
            render: (payload, c) => {
                c.header('content-type', 'application/json');
                return { message: payload + '-rendered' }
            },
        });

        jhx({ route, handler: () => 'response' });

        const res = await app.request(testReq());
        await expectResponse(res, { message: 'response-rendered' }, 'application/json');
    });

    it('returns void', async () => {
        const { app, jhx } = buildServer({
            render: () => {},
        });

        jhx({ route, handler: () => 'response' });

        const res = await app.request(testReq());
        await expectResponse(res, '', 'text/html');
    });

    it('throws error', async () => {
        const { app, jhx } = buildServer({
            render: () => {
                throw new Error('render-error');
            },
        });

        jhx({ route, handler: () => 'response' });

        const res = await app.request(testReq());
        await expectResponse(res, 'Internal Server Error', 'text/plain; charset=UTF-8', 500);
    });
});
