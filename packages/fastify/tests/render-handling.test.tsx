import fs from 'fs';
import path from 'path';
import { describe, it } from 'bun:test';

import { buildServer, expectResponse, ENDPOINT } from './helpers';

const route = ENDPOINT;
const url = `/_jhx${route}`;

describe('render handling', () => {
    it('returns sent response', async () => {
        const fastify = await buildServer({
            render: (data, _req, res) => res.send(data + '-rendered'),
        });

        fastify.jhx({ route, handler: () => 'response' });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, 'response-rendered', 'text/html');
    });

    it('returns buffer (config.contentType)', async () => {
        const fastify = await buildServer({
            contentType: false,
            render: (data) => Buffer.from(data + '-rendered', 'utf-8'),
        });

        fastify.jhx({ route, handler: () => 'response' });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, 'response-rendered', 'application/octet-stream');
    });

    it('returns buffer (res.header)', async () => {
        const fastify = await buildServer({
            render: (data, _req, res) => {
                res.header('content-type', 'application/octet-stream');
                return Buffer.from(data + '-rendered', 'utf-8');
            },
        });

        fastify.jhx({ route, handler: () => 'response' });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, 'response-rendered', 'application/octet-stream');
    });

    it('returns buffer (readFile)', async () => {
        const fastify = await buildServer({
            contentType: false,
            render: (_data, _req, res) => {
                const filepath = path.join(__dirname, 'data.txt');
                fs.readFile(filepath, (err, buff) => res.send(err || buff));
                return res;
            },
        });

        fastify.jhx({ route, handler: () => 'response' });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, 'file-data', 'application/octet-stream');
    });

    it('returns blob (config.contentType=null)', async () => {
        const fastify = await buildServer({
            contentType: false,
            render: () => Bun.file(path.join(__dirname, 'data.txt')),
        });

        fastify.jhx({ route, handler: () => 'should-not-be-seen' });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, 'file-data', 'text/plain;charset=utf-8');
    });

    it('returns stream (res.raw)', async () => {
        const fastify = await buildServer({
            render: async (data, _req, res) => {
                res.raw.writeHead(200, { 'Content-Type': 'text/plain' });
                const chunks = [data, '-', 'rendered'];

                for await (const chunk of chunks) {
                    await new Promise((r) => setTimeout(r, 25));
                    res.raw.write(chunk);
                }

                res.raw.end();
            },
        });

        fastify.jhx({ route, handler: () => 'response' });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, 'response-rendered', 'text/plain');
    });

    it('returns string', async () => {
        const fastify = await buildServer({
            render: (data) => data + '-rendered',
        });

        fastify.jhx({ route, handler: () => 'response' });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, 'response-rendered', 'text/html');
    });

    it('returns object (config.contentType)', async () => {
        const fastify = await buildServer({
            contentType: false,
            render: (data) => ({ message: data + '-rendered' }),
        });

        fastify.jhx({ route, handler: () => 'response' });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, { message: 'response-rendered' }, 'application/json; charset=utf-8');
    });

    it('returns object (res.header)', async () => {
        const fastify = await buildServer({
            render: (data, _req, res) => {
                res.header('content-type', 'application/json; charset=utf-8');
                return { message: data + '-rendered' };
            },
        });

        fastify.jhx({ route, handler: () => 'response' });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, { message: 'response-rendered' }, 'application/json; charset=utf-8');
    });

    it('returns void', async () => {
        const fastify = await buildServer({
            render: () => {},
        });

        fastify.jhx({ route, handler: () => 'should-not-be-seen' });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, '', 'text/html');
    });

    it('throws error', async () => {
        const fastify = await buildServer({
            render: () => {
                throw new Error('render-error');
            },
        });

        fastify.jhx({ route, handler: () => 'should-not-be-seen' });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, { statusCode: 500, error: "Internal Server Error", message:"Unexpected jhx route error" }, 'application/json; charset=utf-8', 500);
    });
});
