import fs from 'fs';
import path from 'path';
import { describe, expect, it } from 'bun:test';

import { buildServer, expectResponse, testReq, ENDPOINT } from './helpers';
import { file, form } from 'elysia';
import { Readable } from 'stream';

const route = ENDPOINT;

describe('render handling', async () => {
    it('returns Elysia context', async () => {
        const { app, jhx } = buildServer({
            render: (_payload, ctx) => ctx as any,
        });

        jhx({ route, handler: () => 'response' });

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
        const { app, jhx } = buildServer({
            render: () => form({
                name: 'response',
                file: file(path.join(__dirname, 'data.txt')),
            }),
        });

        jhx({ route, handler: () => 'response' });

        const res = await app.fetch(testReq());
        const expected = /multipart\/form-data; boundary=-WebkitFormBoundary\S+\r?/;
        expect(expected.test(res.headers.get('content-type') ?? '')).toBe(true);
        expect(res.status).toBe(200);
    });

    it('returns Elysia File (config.contentType=null)', async () => {
        const { app, jhx } = buildServer({
            contentType: null,
            render: () => file(path.join(__dirname, 'data.txt')),
        });

        jhx({ route, handler: () => 'response' });

        const res = await app.fetch(testReq());
        await expectResponse(res, 'file-data', 'text/plain');
    });

    it('returns Response', async () => {
        const { app, jhx } = buildServer({
            render: (payload) => new Response(payload + '-rendered'),
        });

        jhx({ route, handler: () => 'response' });

        const res = await app.fetch(testReq());
        await expectResponse(res, 'response-rendered', 'text/html');
    });

    it('returns buffer (config.contentType=null)', async () => {
        const { app, jhx } = buildServer({
            contentType: null,
            render: (payload) => Buffer.from(payload + '-rendered', 'utf-8'),
        });

        jhx({ route, handler: () => 'response' });

        const res = await app.fetch(testReq());
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

        const res = await app.fetch(testReq());
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

        const res = await app.fetch(testReq());
        await expectResponse(res, 'file-data', 'application/octet-stream');
    });

    it('returns blob (config.contentType=null)', async () => {
        const { app, jhx } = buildServer({
            contentType: null,
            render: () => Bun.file(path.join(__dirname, 'data.txt')),
        });

        jhx({ route, handler: () => 'response' });

        const res = await app.fetch(testReq());
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
            }
        });

        jhx({ route, handler: () => 'response' });

        const res = await app.fetch(testReq());
        await expectResponse(res, 'stream-ok', 'text/html');
    });

    it('returns stream (NodeJS.Readable)', async () => {
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

        const res = await app.fetch(testReq());
        await expectResponse(res, 'stream-ok', 'text/html');
    });

    it('returns string', async () => {
        const { app, jhx } = buildServer({
            render: (payload) => payload + '-rendered',
        });

        jhx({ route, handler: () => 'response' });

        const res = await app.fetch(testReq());
        await expectResponse(res, 'response-rendered', 'text/html');
    });

    it('returns object (config.contentType=null)', async () => {
        const { app, jhx } = buildServer({
            contentType: null,
            render: (payload) => ({ message: payload + '-rendered' }),
        });

        jhx({ route, handler: () => 'response' });

        const res = await app.fetch(testReq());
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

        const res = await app.fetch(testReq());
        await expectResponse(res, { message: 'response-rendered' }, 'application/json');
    });

    it('returns void', async () => {
        const { app, jhx } = buildServer({
            render: () => {},
        });

        jhx({ route, handler: () => 'response' });

        const res = await app.fetch(testReq());
        await expectResponse(res, '', 'text/html');
    });

    it('throws error', async () => {
        const { app, jhx } = buildServer({
            render: () => {
                throw new Error('render-error');
            },
        });

        jhx({ route, handler: () => 'response' });

        const res = await app.fetch(testReq());
        await expectResponse(res, 'Unexpected jhx route error', 'text/html', 500);
    });
});
