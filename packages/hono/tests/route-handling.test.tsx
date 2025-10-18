import path from 'path';
import { describe, it } from 'bun:test';
import { stream } from 'hono/streaming';

import { buildServer, expectResponse, testReq, ENDPOINT } from './helpers';
import { Readable } from 'stream';

const route = ENDPOINT;

describe('route handling', async () => {
    it('returns Hono context', async () => {
        const { app, jhx } = buildServer();

        jhx({
            route,
            handler: (c) => c as any,
        });

        const res = await app.request(testReq());
        await expectResponse(res, { finalized: false }, 'application/json', 200);
    });

    it('returns Response', async () => {
        const { app, jhx } = buildServer();

        jhx({
            route,
            handler: () => new Response('route-ok'),
        });

        const res = await app.request(testReq());
        await expectResponse(res, 'route-ok');
    });

    it('returns JSX (default)', async () => {
        const { app, jhx } = buildServer();

        jhx({
            route,
            handler: () => <div>route-ok</div>,
        });

        const res = await app.request(testReq());
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

        const res = await app.request(testReq());
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

        const res = await app.request(testReq());
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

        const res = await app.request(testReq());
        await expectResponse(res, '{"type":"div","key":null,"props":{"children":"route-ok"},"_owner":null,"_store":{}}', 'application/json');
    });

    it('returns buffer (config.contentType=null)', async () => {
        const { app, jhx } = buildServer({
            contentType: null,
        });

        jhx({
            route,
            handler: () => Buffer.from('route-ok', 'utf-8'),
        });

        const res = await app.request(testReq());
        await expectResponse(res, 'route-ok', );
    });

    it('returns buffer (response header set)', async () => {
        const { app, jhx } = buildServer();

        jhx({
            route,
            handler: (c) => {
                c.header('Content-Type', 'application/octet-stream');
                return Buffer.from('route-ok', 'utf-8');
            },
        });

        const res = await app.request(testReq());
        await expectResponse(res, 'route-ok', 'application/octet-stream');
    });

    it('returns blob (config.contentType=null)', async () => {
        const { app, jhx } = buildServer({
            contentType: null,
        });

        jhx({
            route,
            handler: () => Bun.file(path.join(__dirname, 'data.txt')),
        });

        const res = await app.request(testReq());
        await expectResponse(res, 'file-data', 'text/plain;charset=utf-8');
    });

    it('returns stream (ReadableStream)', async () => {
        const { app, jhx } = buildServer();

        jhx({
            route,
            handler: () => {
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

        const res = await app.request(testReq());
        await expectResponse(res, 'stream-ok', 'text/html');
    });

    it('returns stream (ReadableStream)', async () => {
        const { app, jhx } = buildServer();

        jhx({
            route,
            handler: () => {
                const stream = new Readable();
                stream.push('stream');
                stream.push('-');
                stream.push('ok');
                stream.push(null);
                return stream;
            },
        });

        const res = await app.request(testReq());
        await expectResponse(res, 'stream-ok', 'text/html');
    });

    it('returns stream (HonoStream)', async () => {
        const { app, jhx } = buildServer();

        jhx({
            route,
            handler: (c) => {
                return stream(c, async (stream) => {
                    await stream.write('route-ok')
                })
            },
        });

        const res = await app.request(testReq());
        await expectResponse(res, 'route-ok', 'text/html');
    });

    it('returns string', async () => {
        const { app, jhx } = buildServer();

        jhx({
            route,
            handler: () => 'route-ok',
        });

        const res = await app.request(testReq());
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

        const res = await app.request(testReq());
        await expectResponse(res, { message: 'route-ok' }, 'application/json');
    });

    it('returns object (response header set)', async () => {
        const { app, jhx } = buildServer();

        jhx({
            route,
            handler: (c) => {
                c.header('content-type', 'application/json');
                return { message: 'route-ok' }
            },
        });

        const res = await app.request(testReq());
        await expectResponse(res, { message: 'route-ok' }, 'application/json');
    });

    it('returns void', async () => {
        const { app, jhx } = buildServer();

        jhx({
            route,
            handler: () => {},
        });

        const res = await app.request(testReq());
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

        const res = await app.request(testReq());
        await expectResponse(res, 'Internal Server Error', 'text/plain; charset=UTF-8', 500);
    });
});
