import path from 'path';
import { describe, it } from 'bun:test';
import { stream } from 'hono/streaming';

import { buildServer, expectResponse, testReq } from './helpers';
import { Readable } from 'stream';

describe('not found handling', async () => {
    it('returns Response', async () => {
        const { app } = buildServer({
            notFoundHandler: () => new Response('dne'),
        });

        const res = await app.request(testReq());
        await expectResponse(res, 'dne', null);
    });

    it('returns JSX (default)', async () => {
        const { app } = buildServer({
            notFoundHandler: () => <div>dne</div>,
        });

        const res = await app.request(testReq());
        await expectResponse(res, '<div>dne</div>', 'text/html', 404);
    });

    it('returns JSX (config.render=static)', async () => {
        const { app } = buildServer({
            render: 'static',
            notFoundHandler: () => <div>dne</div>,
        });

        const res = await app.request(testReq());
        await expectResponse(res, '<div>dne</div>', 'text/html', 404);
    });

    it('returns JSX (config.render=string)', async () => {
        const { app } = buildServer({
            render: 'string',
            notFoundHandler: () => <div>dne</div>,
        });

        const res = await app.request(testReq());
        await expectResponse(res, '<div>dne</div>', 'text/html', 404);
    });

    it('returns JSX (config.renderNotFound=false)', async () => {
        const { app } = buildServer({
            renderNotFound: false,
            notFoundHandler: () => <div>dne</div>,
        });

        const res = await app.request(testReq());
        await expectResponse(res, '{"type":"div","key":null,"props":{"children":"dne"},"_owner":null,"_store":{}}', 'application/json', 404);
    });

    it('returns buffer (config.contentType=null)', async () => {
        const { app } = buildServer({
            contentType: null,
            notFoundHandler: () => Buffer.from('dne', 'utf-8'),
        });

        const res = await app.request(testReq());
        await expectResponse(res, 'dne', 'application/octet-stream', 404);
    });

    it('returns buffer (response header set)', async () => {
        const { app } = buildServer({
            notFoundHandler: (ctx) => {
                ctx.header('content-type', 'application/octet-stream');
                return Buffer.from('dne', 'utf-8');
            },
        });

        const res = await app.request(testReq());
        await expectResponse(res, 'dne', 'application/octet-stream', 404);
    });

    it('returns blob (config.contentType=null)', async () => {
        const { app } = buildServer({
            contentType: null,
            notFoundHandler: () => Bun.file(path.join(__dirname, 'data.txt')),
        });

        const res = await app.request(testReq());
        await expectResponse(res, 'file-data', 'text/plain;charset=utf-8', 404);
    });

    it('returns stream (ReadableStream)', async () => {
        const { app } = buildServer({
            notFoundHandler: () => {
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
        await expectResponse(res, 'stream-ok', 'text/html', 404);
    });

    it('returns stream (NodeJS.Stream)', async () => {
        const { app } = buildServer({
            notFoundHandler: () => {
                const stream = new Readable();
                stream.push('stream');
                stream.push('-');
                stream.push('ok');
                stream.push(null);
                return stream;
            },
        });

        const res = await app.request(testReq());
        await expectResponse(res, 'stream-ok', 'text/html', 404);
    });

    it('returns stream (HonoStream)', async () => {
        const { app } = buildServer({
            render: 'string',
            notFoundHandler: (c) => {
                return stream(c, async (stream) => {
                    await stream.write('dne')
                })
            },
        });

        const res = await app.request(testReq());
        await expectResponse(res, 'dne', 'text/html', 404);
    });

    it('returns string', async () => {
        const { app } = buildServer({
            render: 'string',
            notFoundHandler: () => 'dne',
        });

        const res = await app.request(testReq());
        await expectResponse(res, 'dne', 'text/html', 404);
    });

    it('returns object (config.contentType=null)', async () => {
        const { app } = buildServer({
            contentType: null,
            notFoundHandler: () => ({ message: 'dne' }),
        });

        const res = await app.request(testReq());
        await expectResponse(res, { message: 'dne' }, 'application/json', 404);
    });

    it('returns object (response header set)', async () => {
        const { app } = buildServer({
            contentType: null,
            notFoundHandler: (context) => {
                context.header('content-type', 'application/json');
                return { message: 'dne' }
            },
        });

        const res = await app.request(testReq());
        await expectResponse(res, { message: 'dne' }, 'application/json', 404);
    });

    it('returns void', async () => {
        const { app } = buildServer({
            notFoundHandler: () => {},
        });

        const res = await app.request(testReq());
        await expectResponse(res, '', 'text/html', 404);
    });
});
