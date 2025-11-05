import fs from 'fs';
import path from 'path';
import { describe, expect, it } from 'bun:test';

import { buildServer, expectResponse, testReq, ENDPOINT } from './helpers';
import { file, form } from 'elysia';
import { Readable } from 'stream';

const route = ENDPOINT;

describe('middleware error handling', async () => {
    it('returns Elysia FormData', async () => {
        const { app, jhx } = buildServer({
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: () => form({
                name: 'middleware-ok',
                file: file(path.join(__dirname, 'data.txt')),
            })
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.fetch(testReq());
        const expected = /multipart\/form-data; boundary=-WebkitFormBoundary\S+\r?/;
        expect(expected.test(res.headers.get('content-type') ?? '')).toBe(true);
        expect(res.status).toBe(500);
    });

    it('returns Elysia File (config.contentType=null)', async () => {
        const { app, jhx } = buildServer({
            contentType: false,
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: () => file(path.join(__dirname, 'data.txt')),
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.fetch(testReq());
        await expectResponse(res, 'file-data', 'text/plain', 500);
    });

    it('returns Response', async () => {
        const { app, jhx } = buildServer({
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (err) => new Response(err.message),
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.fetch(testReq());
        await expectResponse(res, 'mw-error', 'text/html', 500);
    });

    it('returns JSX (default)', async () => {
        const { app, jhx } = buildServer({
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (err) => <div>{err.message}</div>,
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.fetch(testReq());
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

        const res = await app.fetch(testReq());
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

        const res = await app.fetch(testReq());
        await expectResponse(res, '<div>mw-error</div>', 'text/html', 500);
    });

    it('returns JSX (config.renderError=false)', async () => {
        const { app, jhx } = buildServer({
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (err) => <div>{err.message}</div>,
            renderError: false,
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.fetch(testReq());
        await expectResponse(res, '{"type":"div","key":null,"props":{"children":"mw-error"},"_owner":null,"_store":{}}', 'application/json', 500);
    });

    it('returns buffer (config.contentType=null)', async () => {
        const { app, jhx } = buildServer({
            contentType: false,
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (err) => Buffer.from(err.message, 'utf-8'),
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.fetch(testReq());
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

        const res = await app.fetch(testReq());
        await expectResponse(res, 'mw-error', 'application/octet-stream', 500);
    });

    it('returns buffer (fs.readFile; config.contentType=null)', async () => {
        const { app, jhx } = buildServer({
            contentType: false,
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: async () => {
                const filepath = path.join(__dirname, 'data.txt');
                return await fs.promises.readFile(filepath);
            },
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.fetch(testReq());
        await expectResponse(res, 'file-data', 'application/octet-stream', 500);
    });

    it('returns blob (config.contentType=null)', async () => {
        const { app, jhx } = buildServer({
            contentType: false,
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: () => Bun.file(path.join(__dirname, 'data.txt')),
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.fetch(testReq());
        await expectResponse(res, 'file-data', 'text/plain;charset=utf-8', 500);
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

        const res = await app.fetch(testReq());
        await expectResponse(res, 'stream-ok', 'text/html', 500);
    });

    it('returns stream (NodeJS.Readable)', async () => {
        const { app, jhx } = buildServer({
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: () => {
                const stream = new Readable();
                stream.push('stream');
                stream.push('-');
                stream.push('ok');
                stream.push(null);
                return stream;
            },
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.fetch(testReq());
        await expectResponse(res, 'stream-ok', 'text/html', 500);
    });

    it('returns string', async () => {
        const { app, jhx } = buildServer({
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (err) => err.message,
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.fetch(testReq());
        await expectResponse(res, 'mw-error', 'text/html', 500);
    });

    it('returns object (config.contentType=null)', async () => {
        const { app, jhx } = buildServer({
            contentType: false,
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (err) => ({ message: err.message }),
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.fetch(testReq());
        await expectResponse(res, { message: 'mw-error' }, 'application/json', 500);
    });

    it('returns object (response header set)', async () => {
        const { app, jhx } = buildServer({
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (err, ctx) => {
                ctx.set.headers['content-type'] = 'application/json';
                return ({ message: err.message })
            },
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await app.fetch(testReq());
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

        const res = await app.fetch(testReq());
        await expectResponse(res, '', 'text/html', 500);
    });
});
