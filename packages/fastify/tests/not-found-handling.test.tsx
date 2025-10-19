import fs from 'fs';
import path from 'path';
import { describe, it } from 'bun:test';

import { buildServer, expectResponse } from './helpers';

const url = `/_jhx/dne`;

describe('not found handling', async () => {
    it('returns sent response', async () => {
        const fastify = await buildServer({
            notFoundHandler: (_req, res) => res.send('dne'),
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, 'dne', 'text/html', 404);
    });

    it('returns JSX (default)', async () => {
        const fastify = await buildServer({
            notFoundHandler: () => <div>dne</div>,
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, '<div>dne</div>', 'text/html', 404);
    });

    it('returns JSX (config.render=static)', async () => {
        const fastify = await buildServer({
            render: 'static',
            notFoundHandler: () => <div>dne</div>,
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, '<div>dne</div>', 'text/html', 404);
    });

    it('returns JSX (config.render=string)', async () => {
        const fastify = await buildServer({
            render: 'string',
            notFoundHandler: () => <div>dne</div>,
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, '<div>dne</div>', 'text/html', 404);
    });

    it('returns JSX (config.renderNotFound=false)', async () => {
        const fastify = await buildServer({
            notFoundHandler: () => <div>dne</div>,
            renderNotFound: false,
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, { statusCode: 500, code: "FST_ERR_REP_INVALID_PAYLOAD_TYPE", error: "Internal Server Error", message: "Attempted to send payload of invalid type 'object'. Expected a string or Buffer." }, 'application/json; charset=utf-8', 500);
    });

    it('returns buffer (config.contentType=null)', async () => {
        const fastify = await buildServer({
            contentType: null,
            notFoundHandler: () => Buffer.from('dne', 'utf-8'),
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, 'dne', 'application/octet-stream', 404);
    });

    it('returns buffer (response header set)', async () => {
        const fastify = await buildServer({
            notFoundHandler: (_req, res) => {
                res.header('content-type', 'application/octet-stream');
                return Buffer.from('dne', 'utf-8');
            },
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, 'dne', 'application/octet-stream', 404);
    });

    it('returns buffer (fs.readFile; config.contentType=null)', async () => {
        const fastify = await buildServer({
            contentType: null,
            notFoundHandler: (_req, res) => {
                const filepath = path.join(__dirname, 'data.txt');
                fs.readFile(filepath, (err, buff) => res.send(err || buff));
                return res;
            },
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, 'file-data', 'application/octet-stream', 404);
    });

    it('returns blob (config.contentType=null)', async () => {
        const fastify = await buildServer({
            contentType: null,
            notFoundHandler: () => Bun.file(path.join(__dirname, 'data.txt')),
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, 'file-data', 'text/plain;charset=utf-8', 404);
    });

    it('returns stream (res.raw)', async () => {
        const fastify = await buildServer({
            notFoundHandler: async (_req, res) => {
                res.raw.writeHead(404, { 'Content-Type': 'text/plain' });
                const chunks = ['not', '-', 'found'];

                for await (const chunk of chunks) {
                    await new Promise((r) => setTimeout(r, 25));
                    res.raw.write(chunk);
                }

                res.raw.end();
            },
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, 'not-found', 'text/plain', 404);
    });

    it('returns string', async () => {
        const fastify = await buildServer({
            notFoundHandler: () => 'dne',
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, 'dne', 'text/html', 404);
    });

    it('returns object (config.contentType=null)', async () => {
        const fastify = await buildServer({
            contentType: null,
            notFoundHandler: () => ({ message: 'dne' }),
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, { message: 'dne' }, 'application/json; charset=utf-8', 404);
    });

    it('returns object (response header set)', async () => {
        const fastify = await buildServer({
            notFoundHandler: (_req, res) => {
                res.header('content-type', 'application/json; charset=utf-8');
                return { message: 'dne' };
            },
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, { message: 'dne' }, 'application/json; charset=utf-8', 404);
    });

    it('returns void', async () => {
        const fastify = await buildServer({
            notFoundHandler: () => {},
        });

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, '', 'text/html', 404);
    });
});
