import path from 'path';
import { describe, it } from 'bun:test';
import { stream } from 'hono/streaming';
import { Readable } from 'stream'
import { buildServer, ENDPOINT, expectResponse, testReq } from './helpers';

const route = ENDPOINT;

describe('middleware handling', async () => {
    it('returns Hono context', async () => {
        const { app, jhx } = buildServer({
            middleware: (c) => c as any,
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.request(testReq());
        await expectResponse(res, '', 'text/html', 500);
    });

    it('returns Response', async () => {
        const { app, jhx } = buildServer({
            middleware: () => new Response('middleware-ok'),
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.request(testReq());
        await expectResponse(res, 'middleware-ok', null);
    });

    it('returns JSX (default)', async () => {
        const { app, jhx } = buildServer({
            middleware: () => <div>middleware-ok</div>,
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.request(testReq());
        await expectResponse(res, '<div>middleware-ok</div>', 'text/html');
    });

    it('returns JSX (config.render=static)', async () => {
        const { app, jhx } = buildServer({
            middleware: () => <div>middleware-ok</div>,
            render: 'static',
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.request(testReq());
        await expectResponse(res, '<div>middleware-ok</div>', 'text/html');
    });

    it('returns JSX (config.render=string)', async () => {
        const { app, jhx } = buildServer({
            middleware: () => <div>middleware-ok</div>,
            render: 'string',
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.request(testReq());
        await expectResponse(res, '<div>middleware-ok</div>', 'text/html');
    });

    it('returns JSX (config.renderMiddleware=false)', async () => {
        const { app, jhx } = buildServer({
            middleware: () => <div>middleware-ok</div>,
            renderMiddleware: false,
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.request(testReq());
        await expectResponse(res, '{"type":"div","key":null,"props":{"children":"middleware-ok"},"_owner":null,"_store":{}}', 'application/json');
    });

    it('returns buffer (config.contentType=null)', async () => {
        const { app, jhx } = buildServer({
            contentType: null,
            middleware: () => Buffer.from('middleware-ok', 'utf-8'),
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.request(testReq());
        await expectResponse(res, 'middleware-ok', );
    });

    it('returns buffer (response header set)', async () => {
        const { app, jhx } = buildServer({
            middleware: (c) => {
                c.header('Content-Type', 'application/octet-stream');
                return Buffer.from('middleware-ok', 'utf-8');
            },
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.request(testReq());
        await expectResponse(res, 'middleware-ok', 'application/octet-stream');
    });

    it('returns blob (config.contentType=null)', async () => {
        const { app, jhx } = buildServer({
            contentType: null,
            middleware: () => Bun.file(path.join(__dirname, 'data.txt')),
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.request(testReq());
        await expectResponse(res, 'file-data', 'text/plain;charset=utf-8');
    });

    it('returns stream (ReadableStream)', async () => {
        const { app, jhx } = buildServer({
            middleware: () => {
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

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.request(testReq());
        await expectResponse(res, 'stream-ok', 'text/html');
    });

    it('returns stream (NodeJS.Stream)', async () => {
        const { app, jhx } = buildServer({
            middleware: () => {
                const stream = new Readable();
                stream.push('stream');
                stream.push('-');
                stream.push('ok');
                stream.push(null);
                return stream;
            },
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.request(testReq());
        await expectResponse(res, 'stream-ok', 'text/html');
    });

    it('returns stream (HonoStream)', async () => {
        const { app, jhx } = buildServer({
            middleware: (c) => {
                return stream(c, async (stream) => {
                    await stream.write('middleware-ok')
                })
            },
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.request(testReq());
        await expectResponse(res, 'middleware-ok', 'text/html');
    });

    it('returns string', async () => {
        const { app, jhx } = buildServer({
            middleware: () => 'middleware-ok',
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.request(testReq());
        await expectResponse(res, 'middleware-ok', 'text/html');
    });

    it('returns object (config.contentType=null)', async () => {
        const { app, jhx } = buildServer({
            contentType: null,
            middleware: () => ({ message: 'middleware-ok' }),
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.request(testReq());
        await expectResponse(res, { message: 'middleware-ok' }, 'application/json');
    });

    it('returns object (response header set)', async () => {
        const { app, jhx } = buildServer({
            middleware: (c) => {
                c.header('content-type', 'application/json');
                return { message: 'middleware-ok' }
            },
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.request(testReq());
        await expectResponse(res, { message: 'middleware-ok' }, 'application/json');
    });

    it('returns void', async () => {
        const { app, jhx } = buildServer({
            middleware: () => {},
        });

        jhx({ route, handler: () => 'route-ok' });

        const res = await app.request(testReq());
        await expectResponse(res, 'route-ok', 'text/html');
    });

    it('throws error', async () => {
        const { app, jhx } = buildServer({
            middleware: () => {
                throw new Error('mw-error');
            },
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.request(testReq());
        await expectResponse(res, 'Internal Server Error', 'text/plain; charset=UTF-8', 500);
    });
});
