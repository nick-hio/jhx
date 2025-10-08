import { describe, expect, it } from 'bun:test';
import { buildServer } from "./build-server";
import fs from "fs";
import path from "path";

describe('[jhx-fastify] route handling', async () => {
    it('route returns sent response', async () => {
        const fastify = await buildServer();

        fastify.jhx({
            route: '/test',
            handler: (_req, res) => res.status(201).send('ok'),
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe('ok');
        expect(res.headers['content-type']).toContain('text/html');
        expect(res.statusCode).toBe(201);
    });

    it('route returns JSX (default)', async () => {
        const fastify = await buildServer();

        fastify.jhx({
            route: '/test',
            handler: () => <div>ok</div>,
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe(`<div>ok</div>`);
        expect(res.headers['content-type']).toContain('text/html');
        expect(res.statusCode).toBe(200);
    });

    it('route returns JSX static', async () => {
        const fastify = await buildServer({
            render: 'static',
        });

        fastify.jhx({
            route: '/test',
            handler: () => <div>ok</div>,
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe(`<div>ok</div>`);
        expect(res.headers['content-type']).toContain('text/html');
        expect(res.statusCode).toBe(200);
    });

    it('route returns JSX string', async () => {
        const fastify = await buildServer({
            render: 'string',
        });

        fastify.jhx({
            route: '/test',
            handler: () => <div>ok</div>,
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe(`<div>ok</div>`);
        expect(res.headers['content-type']).toContain('text/html');
        expect(res.statusCode).toBe(200);
    });

    it('route returns buffer (config.contentType)', async () => {
        const fastify = await buildServer({
            contentType: null,
        });

        fastify.jhx({
            route: '/test',
            handler: () => Buffer.from('buffer-ok', 'utf-8'),
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe('buffer-ok');
        expect(res.headers['content-type']).toContain('application/octet-stream');
        expect(res.statusCode).toBe(200);
    });

    it('route returns buffer (res.header)', async () => {
        const fastify = await buildServer();

        fastify.jhx({
            route: '/test',
            handler: (_req, res) => {
                res.header('content-type', 'application/octet-stream');
                return Buffer.from('buffer-ok', 'utf-8');
            },
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe('buffer-ok');
        expect(res.headers['content-type']).toContain('application/octet-stream');
        expect(res.statusCode).toBe(200);
    });

    it('route returns buffer (readFile)', async () => {
        const fastify = await buildServer({
            contentType: null,
        });

        fastify.jhx({
            route: '/test',
            handler: (_req, res) => {
                const filepath = path.join(__dirname, 'data.txt');
                fs.readFile(filepath, (err, buff) => res.send(err || buff));
                return res;
            },
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe('file-data');
        expect(res.headers['content-type']).toContain('application/octet-stream');
        expect(res.statusCode).toBe(200);
    });

    it('route returns stream (res.raw)', async () => {
        const fastify = await buildServer();

        fastify.jhx({
            route: '/test',
            handler: async (_req, res) => {
                res.raw.writeHead(200, { 'Content-Type': 'text/plain' });
                const chunks = ['stream', '-', 'ok'];

                for await (let chunk of chunks) {
                    await new Promise((r) => setTimeout(r, 25));
                    res.raw.write(chunk);
                }

                res.raw.end();
            },
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe('stream-ok');
        expect(res.headers['content-type']).toContain('text/plain');
        expect(res.statusCode).toBe(200);
    });

    it('route returns string', async () => {
        const fastify = await buildServer();

        fastify.jhx({
            route: '/test',
            handler: () => 'ok',
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe('ok');
        expect(res.headers['content-type']).toContain('text/html');
        expect(res.statusCode).toBe(200);
    });

    it('route returns object (config.contentType)', async () => {
        const fastify = await buildServer({
            contentType: null,
        });

        fastify.jhx({
            route: '/test',
            handler: (_req, _res) => {
                return { message: 'ok' };
            },
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.json() as object).toEqual({ message: 'ok' });
        expect(res.headers['content-type']).toContain('application/json');
        expect(res.statusCode).toBe(200);
    });

    it('route returns object (res.header)', async () => {
        const fastify = await buildServer();

        fastify.jhx({
            route: '/test',
            handler: (_req, res) => {
                res.header('content-type', 'application/json; charset=utf-8');
                return { message: 'ok' };
            },
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.json() as object).toEqual({ message: 'ok' });
        expect(res.headers['content-type']).toContain('application/json');
        expect(res.statusCode).toBe(200);
    });

    it('route returns void', async () => {
        const fastify = await buildServer();

        fastify.jhx({
            route: '/test',
            handler: () => {},
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe('');
        expect(res.headers['content-type']).toContain('text/html');
        expect(res.statusCode).toBe(200);
    });

    it('route error', async () => {
        const fastify = await buildServer();

        fastify.jhx({
            route: '/test',
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe('{"statusCode":500,"error":"Internal Server Error","message":"Unexpected jhx route error"}');
        expect(res.headers['content-type']).toContain('application/json');
        expect(res.statusCode).toBe(500);
    });
});
