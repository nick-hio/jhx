import { describe, expect, it } from 'bun:test';
import { buildServer } from "./build-server";
import path from "path";
import fs from "fs";

describe('[jhx-fastify] route error handling', () => {
    it('route errorHandler returns sent response', async () => {
        const fastify = await buildServer({
            errorHandler: (err, _req, res) => res.send(err.message),
        });

        fastify.jhx({
            route: '/test',
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe('route-error');
        expect(res.headers['content-type']).toContain('text/html');
        expect(res.statusCode).toBe(500);
    });

    it('route errorHandler returns JSX (default)', async () => {
        const fastify = await buildServer({
            errorHandler: (err) => <div>{err.message}</div>,
        });

        fastify.jhx({
            route: '/test',
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe('<div>route-error</div>');
        expect(res.headers['content-type']).toContain('text/html');
        expect(res.statusCode).toBe(500);
    });

    it('route errorHandler returns JSX static', async () => {
        const fastify = await buildServer({
            errorHandler: (err) => <div>{err.message}</div>,
            render: 'static',
        });

        fastify.jhx({
            route: '/test',
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe('<div>route-error</div>');
        expect(res.headers['content-type']).toContain('text/html');
        expect(res.statusCode).toBe(500);
    });

    it('route errorHandler returns JSX string', async () => {
        const fastify = await buildServer({
            errorHandler: (err) => <div>{err.message}</div>,
            render: 'string',
        });

        fastify.jhx({
            route: '/test',
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe('<div>route-error</div>');
        expect(res.headers['content-type']).toContain('text/html');
        expect(res.statusCode).toBe(500);
    });

    it('route errorHandler returns buffer (render=false)', async () => {
        const fastify = await buildServer({
            errorHandler: (err) => <div>{err.message}</div>,
            render: false,
        });

        fastify.jhx({
            route: '/test',
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe('{"statusCode":500,"code":"FST_ERR_REP_INVALID_PAYLOAD_TYPE","error":"Internal Server Error","message":"Attempted to send payload of invalid type \'object\'. Expected a string or Buffer."}');
        expect(res.statusCode).toBe(500);
    });

    it('route errorHandler returns buffer (config.contentType)', async () => {
        const fastify = await buildServer({
            contentType: null,
            errorHandler: (err) => Buffer.from(err.message, 'utf-8'),
        });

        fastify.jhx({
            route: '/test',
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe('route-error');
        expect(res.headers['content-type']).toContain('application/octet-stream');
        expect(res.statusCode).toBe(500);
    });

    it('route errorHandler returns buffer (res.header)', async () => {
        const fastify = await buildServer({
            errorHandler: (err, _req, res) => {
                res.header('content-type', 'application/octet-stream');
                return Buffer.from(err.message, 'utf-8');
            },
        });

        fastify.jhx({
            route: '/test',
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe('route-error');
        expect(res.headers['content-type']).toContain('application/octet-stream');
        expect(res.statusCode).toBe(500);
    });

    it('route errorHandler returns buffer (readFile)', async () => {
        const fastify = await buildServer({
            contentType: null,
            errorHandler: (_err, _req, res) => {
                const filepath = path.join(__dirname, 'data.txt');
                fs.readFile(filepath, (err, buff) => res.send(err || buff));
                return res;
            },
        });

        fastify.jhx({
            route: '/test',
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe('file-data');
        expect(res.headers['content-type']).toContain('application/octet-stream');
        expect(res.statusCode).toBe(500);
    });

    it('route errorHandler returns stream (res.raw)', async () => {
        const fastify = await buildServer({
            errorHandler: async (_err, _req, res) => {
                res.raw.writeHead(500, { 'Content-Type': 'text/plain' });
                const chunks = ['route', '-', 'error'];

                for await (let chunk of chunks) {
                    await new Promise((r) => setTimeout(r, 25));
                    res.raw.write(chunk);
                }

                res.raw.end();
            },
        });

        fastify.jhx({
            route: '/test',
            handler: () => {
                throw new Error();
            },
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe('route-error');
        expect(res.headers['content-type']).toContain('text/plain');
        expect(res.statusCode).toBe(500);
    });

    it('route errorHandler returns string', async () => {
        const fastify = await buildServer({
            errorHandler: (err) => {
                return err.message;
            },
        });

        fastify.jhx({
            route: '/test',
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe('route-error');
        expect(res.headers['content-type']).toContain('text/html');
        expect(res.statusCode).toBe(500);
    });

    it('route errorHandler returns object (config.contentType)', async () => {
        const fastify = await buildServer({
            contentType: null,
            errorHandler: (error) => {
                return { message: error.message }
            },
        });

        fastify.jhx({
            route: '/test',
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.json() as object).toEqual({ message: 'route-error' });
        expect(res.headers['content-type']).toContain('application/json');
        expect(res.statusCode).toBe(500);
    });

    it('route errorHandler returns object (res.header)', async () => {
        const fastify = await buildServer({
            errorHandler: (error, _req, res) => {
                res.header('content-type', 'application/json; charset=utf-8');
                return { message: error.message }
            },
        });

        fastify.jhx({
            route: '/test',
            handler: () => {
                throw new Error('route-error');
            },
        });


        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.json() as object).toEqual({ message: 'route-error' });
        expect(res.headers['content-type']).toContain('application/json');
        expect(res.statusCode).toBe(500);
    });

    it('route errorHandler returns void', async () => {
        const fastify = await buildServer({
            errorHandler: () => {},
        });

        fastify.jhx({
            route: '/test',
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe('');
        expect(res.headers['content-type']).toContain('text/html');
        expect(res.statusCode).toBe(500);
    });
});
