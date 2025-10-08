import { describe, expect, it } from 'bun:test';
import { buildServer } from "./build-server";
import fs from "fs";
import path from "path";

describe('[jhx-fastify] custom render handling', () => {
    it('render returns sent response', async () => {
        const fastify = await buildServer({
            render: (data, _req, res) => res.send(data + '-rendered'),
        });

        fastify.jhx({
            route: '/test',
            handler: () => 'response',
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe('response-rendered');
        expect(res.headers['content-type']).toContain('text/html');
        expect(res.statusCode).toBe(200);
    });

    it('render returns buffer (config.contentType)', async () => {
        const fastify = await buildServer({
            contentType: null,
            render: (data) => Buffer.from(data + '-rendered', 'utf-8'),
        });

        fastify.jhx({
            route: '/test',
            handler: () => 'response',
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe('response-rendered');
        expect(res.headers['content-type']).toContain('application/octet-stream');
        expect(res.statusCode).toBe(200);
    });

    it('render returns buffer (res.header)', async () => {
        const fastify = await buildServer({
            render: (data, _req, res) => {
                res.header('content-type', 'application/octet-stream');
                return Buffer.from(data + '-rendered', 'utf-8');
            },
        });

        fastify.jhx({
            route: '/test',
            handler: () => 'response',
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe('response-rendered');
        expect(res.headers['content-type']).toContain('application/octet-stream');
        expect(res.statusCode).toBe(200);
    });

    it('render returns buffer (readFile)', async () => {
        const fastify = await buildServer({
            contentType: null,
            render: (_data, _req, res) => {
                const filepath = path.join(__dirname, 'data.txt');
                fs.readFile(filepath, (err, buff) => res.send(err || buff));
                return res;
            },
        });

        fastify.jhx({
            route: '/test',
            handler: () => 'response',
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe('file-data');
        expect(res.statusCode).toBe(200);
        expect(res.headers['content-type']).toContain('application/octet-stream');
    });

    it('render returns stream (res.raw)', async () => {
        const fastify = await buildServer({
            render: async (data, _req, res) => {
                res.raw.writeHead(200, { 'Content-Type': 'text/plain' });
                const chunks = [data, '-', 'rendered'];

                for await (let chunk of chunks) {
                    await new Promise((r) => setTimeout(r, 25));
                    res.raw.write(chunk);
                }

                res.raw.end();
            },
        });

        fastify.jhx({
            route: '/test',
            handler: () => 'response',
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe('response-rendered');
        expect(res.headers['content-type']).toContain('text/plain');
        expect(res.statusCode).toBe(200);
    });

    it('render returns string', async () => {
        const fastify = await buildServer({
            render: (data) => data + '-rendered',
        });

        fastify.jhx({
            route: '/test',
            handler: () => 'response',
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe('response-rendered');
        expect(res.headers['content-type']).toContain('text/html');
        expect(res.statusCode).toBe(200);
    });

    it('render returns object (config.contentType)', async () => {
        const fastify = await buildServer({
            contentType: null,
            render: (data) => {
                return { message: data + '-rendered' }
            },
        });

        fastify.jhx({
            route: '/test',
            handler: () => 'response',
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.json() as object).toEqual({ message: 'response-rendered' });
        expect(res.headers['content-type']).toContain('application/json');
        expect(res.statusCode).toBe(200);
    });

    it('render returns object (res.header)', async () => {
        const fastify = await buildServer({
            render: (data, _req, res) => {
                res.header('content-type', 'application/json; charset=utf-8');
                return { message: data + '-rendered' }
            },
        });

        fastify.jhx({
            route: '/test',
            handler: () => 'response',
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.json() as object).toEqual({ message: 'response-rendered' });
        expect(res.headers['content-type']).toContain('application/json');
        expect(res.statusCode).toBe(200);
    });

    it('render returns void', async () => {
        const fastify = await buildServer({
            render: () => {},
        });

        fastify.jhx({
            route: '/test',
            handler: () => 'should-not-be-seen',
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe('');
        expect(res.headers['content-type']).toContain('text/html');
        expect(res.statusCode).toBe(200);
    });

    it('render error', async () => {
        const fastify = await buildServer({
            render: () => {
                throw new Error('render-error');
            },
        });

        fastify.jhx({
            route: '/test',
            handler: () => 'should-not-be-seen',
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe('{"statusCode":500,"error":"Internal Server Error","message":"Unexpected jhx route error"}');
        expect(res.headers['content-type']).toContain('application/json');
        expect(res.statusCode).toBe(500);
    });
});
