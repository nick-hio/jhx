import fs from 'fs';
import path from 'path';
import { describe, it } from 'bun:test';

import { buildServer, expectResponse, ENDPOINT } from './helpers';

const route = ENDPOINT;
const url = `/_jhx${route}`;

describe('middleware handling', () => {
    it('returns sent response', async () => {
        const fastify = await buildServer({
            middleware: (_req, reply) => reply.send('middleware-ok'),
        });

        fastify.jhx({ route, handler: () => 'should-not-run' });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, 'middleware-ok', 'text/html');
    });

    it('returns JSX (default)', async () => {
        const fastify = await buildServer({
            middleware: () => <div>middleware-ok</div>,
        });

        fastify.jhx({ route, handler: () => 'should-not-run' });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, `<div>middleware-ok</div>`, 'text/html');
    });

    it('returns JSX (config.render=static)', async () => {
        const fastify = await buildServer({
            middleware: () => <div>middleware-ok</div>,
            render: 'static',
        });

        fastify.jhx({ route, handler: () => 'should-not-run' });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, `<div>middleware-ok</div>`, 'text/html');
    });

    it('returns JSX (config.renderMiddleware=false)', async () => {
        const fastify = await buildServer({
            renderMiddleware: false,
            middleware: () => <div>middleware-ok</div>,
        });

        fastify.jhx({ route, handler: () => 'should-not-run' });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, { statusCode: 500, error: "Internal Server Error", message: "Unexpected jhx middleware error" }, 'application/json; charset=utf-8', 500);
    });

    it('returns buffer (config.contentType=null)', async () => {
        const fastify = await buildServer({
            contentType: null,
            middleware: () => Buffer.from('middleware-ok', 'utf-8'),
        });

        fastify.jhx({ route, handler: () => 'should-not-run' });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, 'middleware-ok', 'application/octet-stream');
    });

    it('returns buffer (response header set)', async () => {
        const fastify = await buildServer({
            middleware: (_req, res) => {
                res.header('content-type', 'application/octet-stream');
                return Buffer.from('middleware-ok', 'utf-8');
            },
        });

        fastify.jhx({ route, handler: () => 'should-not-run' });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, 'middleware-ok', 'application/octet-stream');
    });

    it('returns buffer (fs.readFile; config.contentType=null)', async () => {
        const fastify = await buildServer({
            contentType: null,
            middleware: (_req, res) => {
                const filepath = path.join(__dirname, 'data.txt');
                fs.readFile(filepath, (err, buff) => res.send(err || buff));
                return res;
            },
        });

        fastify.jhx({ route, handler: () => 'should-not-run' });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, 'file-data', 'application/octet-stream');
    });

    it('returns blob (config.contentType=null)', async () => {
        const fastify = await buildServer({
            contentType: null,
            middleware: () => Bun.file(path.join(__dirname, 'data.txt')),
        });

        fastify.jhx({ route, handler: () => 'should-not-run' });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, 'file-data', 'text/plain;charset=utf-8');
    });

    it('returns stream (res.raw)', async () => {
        const fastify = await buildServer({
            middleware: async (_req, res) => {
                res.raw.writeHead(200, { 'Content-Type': 'text/plain' });
                const chunks = ['stream', '-', 'ok'];

                for await (const chunk of chunks) {
                    await new Promise((r) => setTimeout(r, 25));
                    res.raw.write(chunk);
                }

                res.raw.end();
            },
        });

        fastify.jhx({ route, handler: () => 'should-not-run' });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, 'stream-ok', 'text/plain');
    });

    it('returns string', async () => {
        const fastify = await buildServer({
            middleware: () => 'ok',
        });

        fastify.jhx({ route, handler: () => 'should-not-run' });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, 'ok', 'text/html');
    });

    it('returns object (config.contentType=null)', async () => {
        const fastify = await buildServer({
            contentType: null,
            middleware: () => ({ message: 'ok' }),
        });

        fastify.jhx({ route, handler: () => 'should-not-run' });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, { message: 'ok' }, 'application/json; charset=utf-8');
    });

    it('returns object (response header set)', async () => {
        const fastify = await buildServer({
            middleware: (_req, res) => {
                res.header('content-type', 'application/json; charset=utf-8');
                return { message: 'ok' };
            },
        });

        fastify.jhx({ route, handler: () => 'should-not-run' });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, { message: 'ok' }, 'application/json; charset=utf-8');
    });

    it('returns void', async () => {
        const fastify = await buildServer({
            middleware: () => {},
        });

        fastify.jhx({ route, handler: () => 'ok' });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, 'ok', 'text/html');
    });

    it('throws error', async () => {
        const fastify = await buildServer({
            middleware: () => {
                throw new Error('mw-error');
            },
        });

        fastify.jhx({ route, handler: () => 'should-not-run' });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, { statusCode: 500, error: "Internal Server Error", message: "Unexpected jhx middleware error" }, 'application/json; charset=utf-8', 500);
    });
});
