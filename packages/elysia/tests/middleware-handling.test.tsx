import fs from 'fs';
import path from 'path';
import { describe, it } from 'bun:test';

import { buildServer, expectResponse, req, ENDPOINT } from './helpers';

const route = ENDPOINT;

describe('middleware handling', async () => {
    it('returns Response', async () => {
        const { app, jhx } = buildServer({
            middleware: () => new Response('middleware-ok'),
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.fetch(req());
        await expectResponse(res, 'middleware-ok', 'text/html');
    });

    it('returns JSX (default)', async () => {
        const { app, jhx } = buildServer({
            middleware: () => <div>middleware-ok</div>,
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.fetch(req());
        await expectResponse(res, '<div>middleware-ok</div>', 'text/html');
    });

    it('returns JSX (config.render=static)', async () => {
        const { app, jhx } = buildServer({
            middleware: () => <div>middleware-ok</div>,
            render: 'static',
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.fetch(req());
        await expectResponse(res, '<div>middleware-ok</div>', 'text/html');
    });

    it('returns JSX (config.render=string)', async () => {
        const { app, jhx } = buildServer({
            middleware: () => <div>middleware-ok</div>,
            render: 'string',
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.fetch(req());
        await expectResponse(res, '<div>middleware-ok</div>', 'text/html');
    });

    it('returns JSX (config.renderMiddleware=false)', async () => {
        const { app, jhx } = buildServer({
            middleware: () => <div>middleware-ok</div>,
            renderMiddleware: false,
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.fetch(req());
        await expectResponse(res, '{"type":"div","key":null,"props":{"children":"middleware-ok"},"_owner":null,"_store":{}}', 'text/html');
    });

    it('returns buffer (config.contentType=null)', async () => {
        const { app, jhx } = buildServer({
            contentType: null,
            middleware: () => Buffer.from('middleware-ok', 'utf-8'),
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.fetch(req());
        await expectResponse(res, 'middleware-ok', 'application/octet-stream');
    });

    it('returns buffer (response header set)', async () => {
        const { app, jhx } = buildServer({
            middleware: (ctx) => {
                ctx.set.headers['content-type'] = 'application/octet-stream';
                return Buffer.from('middleware-ok', 'utf-8');
            },
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.fetch(req());
        await expectResponse(res, 'middleware-ok', 'application/octet-stream');
    });

    it('returns buffer (fs.readFile; config.contentType=null)', async () => {
        const { app, jhx } = buildServer({
            contentType: null,
            middleware: async () => {
                const filepath = path.join(__dirname, 'data.txt');
                return await fs.promises.readFile(filepath);
            },
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.fetch(req());
        await expectResponse(res, 'file-data', 'application/octet-stream');
    });

    it('returns stream (ReadableStream)', async () => {
        const { app, jhx } = buildServer({
            middleware: () => {
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

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.fetch(req());
        await expectResponse(res, 'stream-ok', 'text/plain');
    });

    it('returns string', async () => {
        const { app, jhx } = buildServer({
            middleware: () => 'middleware-ok',
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.fetch(req());
        await expectResponse(res, 'middleware-ok', 'text/html');
    });

    it('returns object (config.contentType=null)', async () => {
        const { app, jhx } = buildServer({
            contentType: null,
            middleware: () => ({ message: 'middleware-ok' }),
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.fetch(req());
        await expectResponse(res, { message: 'middleware-ok' }, 'application/json');
    });

    it('returns object (response header set)', async () => {
        const { app, jhx } = buildServer({
            middleware: (context) => {
                context.set.headers['content-type'] = 'application/json; charset=utf-8';
                return { message: 'middleware-ok' }
            },
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.fetch(req());
        await expectResponse(res, { message: 'middleware-ok' }, 'application/json');
    });

    it('returns void', async () => {
        const { app, jhx } = buildServer({
            middleware: () => {},
        });

        jhx({ route, handler: () => 'route-ok' });

        const res = await app.fetch(req());
        await expectResponse(res, 'route-ok', 'text/html');
    });

    it('throws error', async () => {
        const { app, jhx } = buildServer({
            middleware: () => {
                throw new Error('mw-error');
            },
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.fetch(req());
        await expectResponse(res, 'Unexpected jhx middleware error', 'text/html', 500);
    });
});
