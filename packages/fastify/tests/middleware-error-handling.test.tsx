import fs from 'fs';
import path from 'path';
import { describe, expect, it } from 'bun:test';

import { buildServer } from './build-server';

describe('[jhx-fastify] middleware error handling', () => {
    it('middleware errorHandler returns sent response', async () => {
        const fastify = await buildServer({
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (err, _req, reply) => {
                return reply.status(400).send(err.message);
            },
        });

        fastify.jhx({
            route: '/test',
            handler: () => 'should-not-run',
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.statusCode).toBe(400);
        expect(res.headers['content-type']).toContain('text/html');
        expect(res.body).toBe('mw-error');
    });

    it('middleware errorHandler returns JSX (default)', async () => {
        const fastify = await buildServer({
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (err) => {
                return <div>{err.message}</div>;
            },
        });

        fastify.jhx({
            route: '/test',
            handler: () => 'should-not-run',
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe('<div>mw-error</div>');
        expect(res.headers['content-type']).toContain('text/html');
        expect(res.statusCode).toBe(500);
    });

    it('middleware errorHandler returns JSX static', async () => {
        const fastify = await buildServer({
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (err) => {
                return <div>{err.message}</div>;
            },
            render: 'static',
        });

        fastify.jhx({
            route: '/test',
            handler: () => 'should-not-run',
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe('<div>mw-error</div>');
        expect(res.headers['content-type']).toContain('text/html');
        expect(res.statusCode).toBe(500);
    });

    it('middleware errorHandler returns JSX string', async () => {
        const fastify = await buildServer({
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (err) => {
                return <div>{err.message}</div>;
            },
            render: 'string',
        });

        fastify.jhx({
            route: '/test',
            handler: () => 'should-not-run',
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe('<div>mw-error</div>');
        expect(res.headers['content-type']).toContain('text/html');
        expect(res.statusCode).toBe(500);
    });

    it('middleware errorHandler returns JSX (render=false)', async () => {
        const fastify = await buildServer({
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (err) => {
                return <div>{err.message}</div>;
            },
            render: false,
        });

        fastify.jhx({
            route: '/test',
            handler: () => 'should-not-run',
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe(
            '{"statusCode":500,"code":"FST_ERR_REP_INVALID_PAYLOAD_TYPE","error":"Internal Server Error","message":"Attempted to send payload of invalid type \'object\'. Expected a string or Buffer."}',
        );
        expect(res.statusCode).toBe(500);
    });

    it('middleware errorHandler returns buffer (config.contentType)', async () => {
        const fastify = await buildServer({
            contentType: null,
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (err) => {
                return Buffer.from(err.message, 'utf-8');
            },
        });

        fastify.jhx({
            route: '/test',
            handler: () => 'should-not-run',
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe('mw-error');
        expect(res.headers['content-type']).toContain('application/octet-stream');
        expect(res.statusCode).toBe(500);
    });

    it('middleware errorHandler returns buffer (res.header)', async () => {
        const fastify = await buildServer({
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (err, _req, res) => {
                res.header('content-type', 'application/octet-stream');
                return Buffer.from(err.message, 'utf-8');
            },
        });

        fastify.jhx({
            route: '/test',
            handler: () => 'should-not-run',
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe('mw-error');
        expect(res.headers['content-type']).toContain('application/octet-stream');
        expect(res.statusCode).toBe(500);
    });

    it('middleware errorHandler returns buffer (readFile)', async () => {
        const fastify = await buildServer({
            contentType: null,
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (_err, _req, res) => {
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
        expect(res.statusCode).toBe(500);
    });

    it('middleware errorHandler returns stream (res.raw)', async () => {
        const fastify = await buildServer({
            contentType: null,
            middleware: () => {
                throw new Error();
            },
            errorHandler: async (_err, _req, res) => {
                res.raw.writeHead(500, { 'Content-Type': 'text/plain' });
                const chunks = ['mw', '-', 'error'];

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
        expect(res.body).toBe('mw-error');
        expect(res.headers['content-type']).toContain('text/plain');
        expect(res.statusCode).toBe(500);
    });

    it('middleware errorHandler returns string', async () => {
        const fastify = await buildServer({
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (err) => {
                return err.message;
            },
        });

        fastify.jhx({
            route: '/test',
            handler: () => 'should-not-run',
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.statusCode).toBe(500);
        expect(res.headers['content-type']).toContain('text/html');
        expect(res.body).toBe('mw-error');
    });

    it('middleware errorHandler returns object (config.contentType)', async () => {
        const fastify = await buildServer({
            contentType: null,
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (error) => {
                return { message: error.message };
            },
        });

        fastify.jhx({
            route: '/test',
            handler: () => 'should-not-run',
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.statusCode).toBe(500);
        expect(res.headers['content-type']).toContain('application/json');
        expect(res.json() as object).toEqual({ message: 'mw-error' });
    });

    it('middleware errorHandler returns object (application/json)', async () => {
        const fastify = await buildServer({
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (error, _req, res) => {
                res.header('content-type', 'application/json; charset=utf-8');
                return { message: error.message };
            },
        });

        fastify.jhx({
            route: '/test',
            handler: () => 'should-not-run',
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.statusCode).toBe(500);
        expect(res.headers['content-type']).toContain('application/json');
        expect(res.json() as object).toEqual({ message: 'mw-error' });
    });

    it('middleware errorHandler returns void', async () => {
        const fastify = await buildServer({
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: () => {},
        });

        fastify.jhx({
            route: '/test',
            handler: () => 'should-not-run',
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.statusCode).toBe(500);
        expect(res.headers['content-type']).toContain('text/html');
        expect(res.body).toBe('');
    });
});
