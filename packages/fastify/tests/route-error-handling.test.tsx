import fs from 'fs';
import path from 'path';
import { describe, it } from 'bun:test';

import { buildServer, expectResponse, ENDPOINT } from './helpers';

const route = ENDPOINT;
const url = `/_jhx${route}`;

describe('route error handling', () => {
    it('returns sent response', async () => {
        const fastify = await buildServer({
            errorHandler: (err, _req, res) => res.send(err.message),
        });

        fastify.jhx({
            route,
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, 'route-error', 'text/html', 500);
    });

    it('returns JSX (default)', async () => {
        const fastify = await buildServer({
            errorHandler: (err) => <div>{err.message}</div>,
        });

        fastify.jhx({
            route,
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, '<div>route-error</div>', 'text/html', 500);
    });

    it('returns JSX (config.render=static)', async () => {
        const fastify = await buildServer({
            errorHandler: (err) => <div>{err.message}</div>,
            render: 'static',
        });

        fastify.jhx({
            route,
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, '<div>route-error</div>', 'text/html', 500);
    });

    it('returns JSX (config.render=string)', async () => {
        const fastify = await buildServer({
            errorHandler: (err) => <div>{err.message}</div>,
            render: 'string',
        });

        fastify.jhx({
            route,
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, '<div>route-error</div>', 'text/html', 500);
    });

    it('returns JSX (config.renderError=false)', async () => {
        const fastify = await buildServer({
            errorHandler: (err) => <div>{err.message}</div>,
            renderError: false,
        });

        fastify.jhx({
            route,
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, { statusCode: 500, code: "FST_ERR_REP_INVALID_PAYLOAD_TYPE", error: "Internal Server Error", message:"Attempted to send payload of invalid type 'object'. Expected a string or Buffer." }, 'application/json; charset=utf-8', 500);
    });

    it('returns buffer (config.contentType=null)', async () => {
        const fastify = await buildServer({
            contentType: null,
            errorHandler: (err) => Buffer.from(err.message, 'utf-8'),
        });

        fastify.jhx({
            route,
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, 'route-error', 'application/octet-stream', 500);
    });

    it('returns buffer (response header set)', async () => {
        const fastify = await buildServer({
            errorHandler: (err, _req, res) => {
                res.header('content-type', 'application/octet-stream');
                return Buffer.from(err.message, 'utf-8');
            },
        });

        fastify.jhx({
            route,
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, 'route-error', 'application/octet-stream', 500);
    });

    it('returns buffer (fs.readFile; config.contentType=null)', async () => {
        const fastify = await buildServer({
            contentType: null,
            errorHandler: (_err, _req, res) => {
                const filepath = path.join(__dirname, 'data.txt');
                fs.readFile(filepath, (err, buff) => res.send(err || buff));
                return res;
            },
        });

        fastify.jhx({
            route,
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, 'file-data', 'application/octet-stream', 500);
    });

    it('returns blob (config.contentType=null)', async () => {
        const fastify = await buildServer({
            contentType: null,
            errorHandler: () => Bun.file(path.join(__dirname, 'data.txt')),
        });

        fastify.jhx({
            route,
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, 'file-data', 'text/plain;charset=utf-8', 500);
    });

    it('returns stream (res.raw)', async () => {
        const fastify = await buildServer({
            errorHandler: async (_err, _req, res) => {
                res.raw.writeHead(500, { 'Content-Type': 'text/plain' });
                const chunks = ['route', '-', 'error'];

                for await (const chunk of chunks) {
                    await new Promise((r) => setTimeout(r, 25));
                    res.raw.write(chunk);
                }

                res.raw.end();
            },
        });

        fastify.jhx({
            route,
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, 'route-error', 'text/plain', 500);
    });

    it('returns string', async () => {
        const fastify = await buildServer({
            errorHandler: (err) => err.message,
        });

        fastify.jhx({
            route,
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, 'route-error', 'text/html', 500);
    });

    it('returns object (config.contentType=null)', async () => {
        const fastify = await buildServer({
            contentType: null,
            errorHandler: (error) => ({ message: error.message }),
        });

        fastify.jhx({
            route,
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, { message: 'route-error' }, 'application/json; charset=utf-8', 500);
    });

    it('returns object (response header set)', async () => {
        const fastify = await buildServer({
            errorHandler: (error, _req, res) => {
                res.header('content-type', 'application/json');
                return { message: error.message };
            },
        });

        fastify.jhx({
            route,
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, { message: 'route-error' }, 'application/json; charset=utf-8', 500);
    });

    it('returns void', async () => {
        const fastify = await buildServer({
            errorHandler: () => {},
        });

        fastify.jhx({
            route,
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, '', 'text/html', 500);
    });
});
