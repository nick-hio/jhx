import fs from 'fs';
import path from 'path';
import { describe, it } from 'bun:test';

import { buildServer, expectResponse, req, ENDPOINT } from './helpers';

const route = ENDPOINT;

describe('middleware error handling', async () => {
    it('returns Response', async () => {
        const { app, jhx } = buildServer({
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (err) => new Response(err.message),
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.fetch(req());
        await expectResponse(res, 'mw-error', 'text/html');
    });

    it('returns JSX (default)', async () => {
        const { app, jhx } = buildServer({
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (err) => <div>{err.message}</div>,
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.fetch(req());
        await expectResponse(res, '<div>mw-error</div>', 'text/html', 500);
    });

    it('returns JSX (config.render=static)', async () => {
        const { app, jhx } = buildServer({
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (err) => <div>{err.message}</div>,
            render: 'static',
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.fetch(req());
        await expectResponse(res, '<div>mw-error</div>', 'text/html', 500);
    });

    it('returns JSX (config.render=string)', async () => {
        const { app, jhx } = buildServer({
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (err) => <div>{err.message}</div>,
            render: 'string',
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.fetch(req());
        await expectResponse(res, '<div>mw-error</div>', 'text/html', 500);
    });

    it('returns JSX (config.renderError=false)', async () => {
        const { app, jhx } = buildServer({
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (err) => <div>{err.message}</div>,
            render: false,
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.fetch(req());
        await expectResponse(res, '{"type":"div","key":null,"props":{"children":"mw-error"},"_owner":null,"_store":{}}', 'text/html', 500);
    });

    it('returns buffer (config.contentType=null)', async () => {
        const { app, jhx } = buildServer({
            contentType: null,
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (err) => Buffer.from(err.message, 'utf-8'),
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.fetch(req());
        await expectResponse(res, 'mw-error', 'application/octet-stream', 500);
    });

    it('returns buffer (response header set)', async () => {
        const { app, jhx } = buildServer({
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (err, ctx) => {
                ctx.set.headers['content-type'] = 'application/octet-stream';
                return Buffer.from(err.message, 'utf-8');
            },
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.fetch(req());
        await expectResponse(res, 'mw-error', 'application/octet-stream', 500);
    });

    it('returns buffer (fs.readFile; config.contentType=null)', async () => {
        const { app, jhx } = buildServer({
            contentType: null,
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: async () => {
                const filepath = path.join(__dirname, 'data.txt');
                return await fs.promises.readFile(filepath);
            },
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.fetch(req());
        await expectResponse(res, 'file-data', 'application/octet-stream', 500);
    });

    it('returns stream (ReadableStream)', async () => {
        const { app, jhx } = buildServer({
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: () => {
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
                    status: 500,
                    headers: { 'content-type': 'text/plain; charset=utf-8' },
                });
            },
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.fetch(req());
        await expectResponse(res, 'stream-ok', 'text/plain', 500);
    });

    it('returns string', async () => {
        const { app, jhx } = buildServer({
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (err) => err.message,
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.fetch(req());
        await expectResponse(res, 'mw-error', 'text/html', 500);
    });

    it('returns object (config.contentType=null)', async () => {
        const { app, jhx } = buildServer({
            contentType: null,
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (err) => ({ message: err.message }),
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.fetch(req());
        await expectResponse(res, { message: 'mw-error' }, 'application/json', 500);
    });

    it('returns object (response header set)', async () => {
        const { app, jhx } = buildServer({
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (err, ctx) => {
                ctx.set.headers['content-type'] = 'application/json; charset=utf-8';
                return ({ message: err.message })
            },
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.fetch(req());
        await expectResponse(res, { message: 'mw-error' }, 'application/json', 500);
    });

    it('returns void', async () => {
        const { app, jhx } = buildServer({
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: () => {},
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.fetch(req());
        await expectResponse(res, '', 'text/html', 500);
    });
});
