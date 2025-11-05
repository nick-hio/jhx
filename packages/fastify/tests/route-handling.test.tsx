import fs from 'fs';
import path from 'path';
import { describe, it } from 'bun:test';

import { buildServer, expectResponse, ENDPOINT } from './helpers';

const route = ENDPOINT;
const url = `/_jhx${route}`;

describe('route handling', async () => {
    it('returns sent response', async () => {
        const fastify = await buildServer();

        fastify.jhx({
            route,
            handler: (_req, res) => res.status(201).send('ok'),
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, 'ok', 'text/html', 201);
    });

    it('returns JSX (default)', async () => {
        const fastify = await buildServer();

        fastify.jhx({
            route,
            handler: () => <div>ok</div>,
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, '<div>ok</div>', 'text/html');
    });

    it('returns JSX (config.render=static)', async () => {
        const fastify = await buildServer({
            render: 'static',
        });

        fastify.jhx({
            route,
            handler: () => <div>ok</div>,
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, '<div>ok</div>', 'text/html');
    });

    it('returns JSX (config.render=string)', async () => {
        const fastify = await buildServer({
            render: 'string',
        });

        fastify.jhx({
            route,
            handler: () => <div>ok</div>,
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, '<div>ok</div>', 'text/html');
    });

    it('returns buffer (config.contentType=null)', async () => {
        const fastify = await buildServer({
            contentType: false,
        });

        fastify.jhx({
            route,
            handler: () => Buffer.from('ok', 'utf-8'),
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, 'ok', 'application/octet-stream');
    });

    it('returns buffer (response header set)', async () => {
        const fastify = await buildServer();

        fastify.jhx({
            route,
            handler: (_req, res) => {
                res.header('content-type', 'application/octet-stream');
                return Buffer.from('ok', 'utf-8');
            },
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, 'ok', 'application/octet-stream');
    });

    it('returns buffer (fs.readFile; config.contentType=null)', async () => {
        const fastify = await buildServer({
            contentType: false,
        });

        fastify.jhx({
            route,
            handler: (_req, res) => {
                const filepath = path.join(__dirname, 'data.txt');
                fs.readFile(filepath, (err, buff) => res.send(err || buff));
                return res;
            },
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, 'file-data', 'application/octet-stream');
    });

    it('returns blob (config.contentType=null)', async () => {
        const fastify = await buildServer({
            contentType: false,
        });

        fastify.jhx({
            route,
            handler: () => Bun.file(path.join(__dirname, 'data.txt')),
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, 'file-data', 'text/plain;charset=utf-8');
    });

    it('returns stream (res.raw)', async () => {
        const fastify = await buildServer();

        fastify.jhx({
            route,
            handler: async (_req, res) => {
                res.raw.writeHead(200, { 'Content-Type': 'text/plain' });
                const chunks = ['stream', '-', 'ok'];

                for await (const chunk of chunks) {
                    await new Promise((r) => setTimeout(r, 25));
                    res.raw.write(chunk);
                }

                res.raw.end();
            },
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expectResponse(res, 'stream-ok', 'text/plain');
    });

    it('returns string', async () => {
        const fastify = await buildServer();

        fastify.jhx({
            route,
            handler: () => 'ok',
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expectResponse(res, 'ok', 'text/html');
    });

    it('returns object (config.contentType=null)', async () => {
        const fastify = await buildServer({
            contentType: false,
        });

        fastify.jhx({
            route,
            handler: (_req, _res) => {
                return { message: 'ok' };
            },
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, { message: 'ok' }, 'application/json; charset=utf-8');
    });

    it('returns object (response header set)', async () => {
        const fastify = await buildServer();

        fastify.jhx({
            route,
            handler: (_req, res) => {
                res.header('content-type', 'application/json; charset=utf-8');
                return { message: 'ok' };
            },
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, { message: 'ok' }, 'application/json; charset=utf-8');
    });

    it('returns void', async () => {
        const fastify = await buildServer();

        fastify.jhx({
            route,
            handler: () => {},
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, '', 'text/html');
    });

    it('throws error', async () => {
        const fastify = await buildServer();

        fastify.jhx({
            route: '/test',
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expectResponse(res, { statusCode: 500, error: "Internal Server Error", message: "Unexpected jhx route error" }, 'application/json; charset=utf-8', 500);
    });
});
