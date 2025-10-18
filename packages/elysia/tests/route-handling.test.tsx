import fs from 'fs';
import path from 'path';
import { describe, expect, it } from 'bun:test';

import { buildServer, expectResponse, testReq, ENDPOINT } from './helpers';
import { Readable } from 'stream';
import { file, form } from 'elysia';

const route = ENDPOINT;

describe('route handling', async () => {
    it('returns Elysia context', async () => {
        const { app, jhx } = buildServer();

        jhx({
            route,
            handler: (ctx) => ctx as any,
        });

        const res = await app.fetch(testReq());
        const expected = {
            request: {},
            store: {},
            qi: -1,
            path: `/_jhx${ENDPOINT}`,
            url: `http://localhost/_jhx${ENDPOINT}`,
            set: {
                headers: {
                    'content-type': 'application/json',
                },
                status: 200,
            },
            params: {
                '*': 'test',
            },
        };
        await expectResponse(res, expected, 'application/json', 200)
    });

    it('returns Elysia FormData', async () => {
        const { app, jhx } = buildServer();

        jhx({
            route,
            handler: () => form({
                name: 'middleware-ok',
                file: file(path.join(__dirname, 'data.txt')),
            }),
        });

        const res = await app.fetch(testReq());
        const expected = /multipart\/form-data; boundary=-WebkitFormBoundary\S+\r?/;
        expect(expected.test(res.headers.get('content-type') ?? '')).toBe(true);
        expect(res.status).toBe(200);
    });

    it('returns Elysia File (config.contentType=null)', async () => {
        const { app, jhx } = buildServer({
            contentType: null,
        });

        jhx({
            route,
            handler: () => file(path.join(__dirname, 'data.txt')),
        });

        const res = await app.fetch(testReq());
        await expectResponse(res, 'file-data', 'text/plain');
    });

    it('returns Response', async () => {
        const { app, jhx } = buildServer();

        jhx({
            route,
            handler: () => new Response('route-ok'),
        });

        const res = await app.fetch(testReq());
        await expectResponse(res, 'route-ok', 'text/html');
    });

    it('returns JSX (default)', async () => {
        const { app, jhx } = buildServer();

        jhx({
            route,
            handler: () => <div>route-ok</div>,
        });

        const res = await app.fetch(testReq());
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

        const res = await app.fetch(testReq());
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

        const res = await app.fetch(testReq());
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

        const res = await app.fetch(testReq());
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

        const res = await app.fetch(testReq());
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

        const res = await app.fetch(testReq());
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

        const res = await app.fetch(testReq());
        await expectResponse(res, 'file-data', 'application/octet-stream');
    });

    it('returns blob (config.contentType=null)', async () => {
        const { app, jhx } = buildServer({
            contentType: null,
        });

        jhx({
            route,
            handler: () => Bun.file(path.join(__dirname, 'data.txt')),
        });

        const res = await app.fetch(testReq());
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

        const res = await app.fetch(testReq());
        await expectResponse(res, 'stream-ok', 'text/html');
    });

    it('returns stream (NodeJS.Readable)', async () => {
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

        const res = await app.fetch(testReq());
        await expectResponse(res, 'stream-ok', 'text/html');
    });

    it('returns string', async () => {
        const { app, jhx } = buildServer();

        jhx({
            route,
            handler: () => 'route-ok',
        });

        const res = await app.fetch(testReq());
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

        const res = await app.fetch(testReq());
        await expectResponse(res, { message: 'route-ok' }, 'application/json');
    });

    it('returns object (response header set)', async () => {
        const { app, jhx } = buildServer();

        jhx({
            route,
            handler: (context) => {
                context.set.headers['content-type'] = 'application/json';
                return { message: 'route-ok' }
            },
        });

        const res = await app.fetch(testReq());
        await expectResponse(res, { message: 'route-ok' }, 'application/json');
    });

    it('returns void', async () => {
        const { app, jhx } = buildServer();

        jhx({
            route,
            handler: () => {},
        });

        const res = await app.fetch(testReq());
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

        const res = await app.fetch(testReq());
        await expectResponse(res, 'Unexpected jhx route error', 'text/html', 500);
    });
});
