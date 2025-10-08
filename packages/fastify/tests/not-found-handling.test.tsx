import { describe, expect, it } from 'bun:test';
import { buildServer } from "./build-server";
import path from "path";
import fs from "fs";

describe('[jhx-fastify] not found handling', async () => {
    it('notFoundHandler returns sent response', async () => {
        const fastify = await buildServer({
            notFoundHandler: (_req, res) => res.send('dne'),
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/dne' });
        expect(res.body).toEqual('dne');
        expect(res.headers['content-type']).toContain('text/html');
        expect(res.statusCode).toBe(404);
    });

    it('notFoundHandler returns JSX (default)', async () => {
        const fastify = await buildServer({
            notFoundHandler: () => <div>dne</div>,
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/dne' });
        expect(res.body).toBe('<div>dne</div>');
        expect(res.headers['content-type']).toContain('text/html');
        expect(res.statusCode).toBe(404);
    });

    it('notFoundHandler returns JSX static', async () => {
        const fastify = await buildServer({
            render: 'static',
            notFoundHandler: () => <div>dne</div>,
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/dne' });
        expect(res.body).toBe('<div>dne</div>');
        expect(res.headers['content-type']).toContain('text/html');
        expect(res.statusCode).toBe(404);
    });

    it('notFoundHandler returns JSX string', async () => {
        const fastify = await buildServer({
            render: 'string',
            notFoundHandler: () => <div>dne</div>,
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/dne' });
        expect(res.body).toBe('<div>dne</div>');
        expect(res.headers['content-type']).toContain('text/html');
        expect(res.statusCode).toBe(404);
    });

    it('notFoundHandler returns JSX (render=false)', async () => {
        const fastify = await buildServer({
            notFoundHandler: () => <div>dne</div>,
            render: false,
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/dne' });
        expect(res.body).toBe('{"statusCode":500,"code":"FST_ERR_REP_INVALID_PAYLOAD_TYPE","error":"Internal Server Error","message":"Attempted to send payload of invalid type \'object\'. Expected a string or Buffer."}');
        expect(res.statusCode).toBe(500);
    });

    it('notFoundHandler returns buffer (config.contentType)', async () => {
        const fastify = await buildServer({
            contentType: null,
            notFoundHandler: () => Buffer.from('dne', 'utf-8'),
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/dne' });
        expect(res.body).toBe('dne');
        expect(res.headers['content-type']).toContain('application/octet-stream');
        expect(res.statusCode).toBe(404);
    });

    it('notFoundHandler returns buffer (res.header)', async () => {
        const fastify = await buildServer({
            notFoundHandler: (_req, res) => {
                res.header('content-type', 'application/octet-stream');
                return Buffer.from('dne', 'utf-8');
            },
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/dne' });
        expect(res.body).toBe('dne');
        expect(res.headers['content-type']).toContain('application/octet-stream');
        expect(res.statusCode).toBe(404);
    });

    it('notFoundHandler returns buffer (readFile)', async () => {
        const fastify = await buildServer({
            contentType: null,
            notFoundHandler: (_req, res) => {
                const filepath = path.join(__dirname, 'data.txt');
                fs.readFile(filepath, (err, buff) => res.send(err || buff));
                return res;
            },
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/dne' });
        expect(res.body).toBe('file-data');
        expect(res.headers['content-type']).toContain('application/octet-stream');
        expect(res.statusCode).toBe(404);
    });

    it('notFoundHandler returns stream (res.raw)', async () => {
        const fastify = await buildServer({
            notFoundHandler: async (_req, res) => {
                res.raw.writeHead(404, { 'Content-Type': 'text/plain' });
                const chunks = ['not', '-', 'found'];

                for await (let chunk of chunks) {
                    await new Promise((r) => setTimeout(r, 25));
                    res.raw.write(chunk);
                }

                res.raw.end();
            },
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/dne' });
        expect(res.body).toBe('not-found');
        expect(res.headers['content-type']).toContain('text/plain');
        expect(res.statusCode).toBe(404);
    });

    it('notFoundHandler returns string', async () => {
        const fastify = await buildServer({
            notFoundHandler: () => 'dne',
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/dne' });
        expect(res.body).toEqual('dne');
        expect(res.headers['content-type']).toContain('text/html');
        expect(res.statusCode).toBe(404);
    });

    it('notFoundHandler returns object (config.contentType)', async () => {
        const fastify = await buildServer({
            contentType: null,
            notFoundHandler: () => ({ message: 'dne' }),
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/dne' });
        expect(res.json() as object).toEqual({ message: 'dne' });
        expect(res.headers['content-type']).toContain('application/json');
        expect(res.statusCode).toBe(404);
    });

    it('notFoundHandler returns object (res.header)', async () => {
        const fastify = await buildServer({
            notFoundHandler: (_req, res) => {
                res.header('content-type', 'application/json; charset=utf-8');
                return { message: 'dne' };
            },
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/dne' });
        expect(res.json() as object).toEqual({ message: 'dne' });
        expect(res.headers['content-type']).toContain('application/json');
        expect(res.statusCode).toBe(404);
    });

    it('notFoundHandler returns void', async () => {
        const fastify = await buildServer({
            notFoundHandler: () => {},
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/dne' });
        expect(res.statusCode).toBe(404);
        expect(res.headers['content-type']).toContain('text/html');
        expect(res.body).toEqual('');
    });
});
