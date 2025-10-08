import fs from 'fs';
import path from 'path';
import { describe, expect, it } from 'bun:test';

import { buildServer } from './build-server';

describe('[jhx-fastify] middleware handling', () => {
    it('middleware returns sent response', async () => {
        const fastify = await buildServer({
            middleware: (_req, reply) => {
                return reply.send('middleware-ok');
            },
        });

        fastify.jhx({
            route: '/test',
            handler: () => 'should-not-run',
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toBe('middleware-ok');
    });

    it('middleware returns JSX (default)', async () => {
        const fastify = await buildServer({
            middleware: () => {
                return <div>middleware-ok</div>;
            },
        });

        fastify.jhx({
            route: '/test',
            handler: () => 'should-not-run',
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe(`<div>middleware-ok</div>`);
        expect(res.statusCode).toBe(200);
    });

    it('middleware returns JSX static', async () => {
        const fastify = await buildServer({
            middleware: () => {
                return <div>middleware-ok</div>;
            },
            render: 'static',
        });

        fastify.jhx({
            route: '/test',
            handler: () => 'should-not-run',
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe(`<div>middleware-ok</div>`);
        expect(res.statusCode).toBe(200);
    });

    it('middleware returns JSX string', async () => {
        const fastify = await buildServer({
            middleware: () => {
                return <div>middleware-ok</div>;
            },
            render: 'string',
        });

        fastify.jhx({
            route: '/test',
            handler: () => 'should-not-run',
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe(`<div>middleware-ok</div>`);
        expect(res.statusCode).toBe(200);
    });

    it('middleware returns JSX (renderMiddleware=false)', async () => {
        const fastify = await buildServer({
            renderMiddleware: false,
            middleware: () => {
                return <div>middleware-ok</div>;
            },
        });

        fastify.jhx({
            route: '/test',
            handler: () => 'should-not-run',
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe(
            '{"statusCode":500,"error":"Internal Server Error","message":"Unexpected jhx middleware error"}',
        );
        expect(res.statusCode).toBe(500);
    });

    it('middleware returns buffer (config.contentType)', async () => {
        const fastify = await buildServer({
            contentType: null,
            middleware: () => Buffer.from('middleware-ok', 'utf-8'),
        });

        fastify.jhx({
            route: '/test',
            handler: () => 'should-not-run',
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe('middleware-ok');
        expect(res.headers['content-type']).toContain('application/octet-stream');
        expect(res.statusCode).toBe(200);
    });

    it('middleware returns buffer (res.header)', async () => {
        const fastify = await buildServer({
            contentType: null,
            middleware: (_req, res) => {
                res.header('content-type', 'application/octet-stream');
                return Buffer.from('middleware-ok', 'utf-8');
            },
        });

        fastify.jhx({
            route: '/test',
            handler: () => 'should-not-run',
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe('middleware-ok');
        expect(res.headers['content-type']).toContain('application/octet-stream');
        expect(res.statusCode).toBe(200);
    });

    it('middleware returns buffer (readFile)', async () => {
        const fastify = await buildServer({
            contentType: null,
            middleware: (_req, res) => {
                const filepath = path.join(__dirname, 'data.txt');
                fs.readFile(filepath, (err, buff) => res.send(err || buff));
                return res;
            },
        });

        fastify.jhx({
            route: '/test',
            handler: () => 'should-not-run',
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe('file-data');
        expect(res.headers['content-type']).toContain('application/octet-stream');
        expect(res.statusCode).toBe(200);
    });

    it('middleware returns stream (res.raw)', async () => {
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

        fastify.jhx({
            route: '/test',
            handler: () => 'should-not-run',
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe('stream-ok');
        expect(res.headers['content-type']).toContain('text/plain');
        expect(res.statusCode).toBe(200);
    });

    it('middleware returns string', async () => {
        const fastify = await buildServer({
            middleware: () => {
                return 'ok';
            },
        });

        fastify.jhx({
            route: '/test',
            handler: () => 'should-not-run',
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toBe('ok');
    });

    it('middleware returns object (config.contentType)', async () => {
        const fastify = await buildServer({
            contentType: null,
            middleware: () => {
                return { message: 'ok' };
            },
        });

        fastify.jhx({
            route: '/test',
            handler: () => 'should-not-run',
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.statusCode).toBe(200);
        expect(res.headers['content-type']).toContain('application/json');
        expect(res.json() as object).toEqual({ message: 'ok' });
    });

    it('middleware returns object (application/json)', async () => {
        const fastify = await buildServer({
            middleware: (_req, res) => {
                res.header('content-type', 'application/json; charset=utf-8');
                return { message: 'ok' };
            },
        });

        fastify.jhx({
            route: '/test',
            handler: () => 'should-not-run',
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.statusCode).toBe(200);
        expect(res.headers['content-type']).toContain('application/json');
        expect(res.json() as object).toEqual({ message: 'ok' });
    });

    it('middleware returns void', async () => {
        const fastify = await buildServer({
            middleware: () => {},
        });

        fastify.jhx({
            route: '/test',
            handler: () => 'ok',
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toBe('ok');
    });

    it('middleware error', async () => {
        const fastify = await buildServer({
            middleware: () => {
                throw new Error('mw-error');
            },
        });

        fastify.jhx({
            route: '/test',
            handler: () => 'should-not-run',
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.statusCode).toBe(500);
        expect(res.body).toBe(
            '{"statusCode":500,"error":"Internal Server Error","message":"Unexpected jhx middleware error"}',
        );
    });
});
