import { describe, it, afterAll } from 'bun:test';
import fs from 'fs';
import path from 'path';

import { buildServer, closeServers, expectResponse, PortGenerator } from './helpers';

const testUrl = (port: number) => `http://localhost:${port}/_jhx/test`;
const testServers: any[] = [];

describe('route error handling', () => {
    afterAll(async () => {
        await closeServers(testServers);
    });

    const ports = new PortGenerator(20000);

    it('returns sent response', async () => {
        const port = ports.getPort();
        const { jhx } = await buildServer(testServers, port, {
            errorHandler: (err, _req, res) => res.status(400).send(err.message),
        });

        jhx({
            route: '/test',
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'route-error', 'text/html', 400);
    });

    it('returns JSX (default)', async () => {
        const port = ports.getPort();
        const { jhx } = await buildServer(testServers, port, {
            errorHandler: (err) => <div>{err.message}</div>,
        });

        jhx({
            route: '/test',
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, '<div>route-error</div>', 'text/html', 400);
    });

    it('returns JSX (config.render=static)', async () => {
        const port = ports.getPort();
        const { jhx } = await buildServer(testServers, port, {
            errorHandler: (err) => <div>{err.message}</div>,
            render: 'static',
        });

        jhx({
            route: '/test',
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, '<div>route-error</div>', 'text/html', 400);
    });

    it('returns JSX (config.render=string)', async () => {
        const port = ports.getPort();
        const { jhx } = await buildServer(testServers, port, {
            errorHandler: (err) => <div>{err.message}</div>,
            render: 'string',
        });

        jhx({
            route: '/test',
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, '<div>route-error</div>', 'text/html', 400);
    });

    it('returns JSX (config.renderError=false)', async () => {
        const port = ports.getPort();
        const { jhx } = await buildServer(testServers, port, {
            errorHandler: (err) => <div>{err.message}</div>,
            renderError: false,
        });

        jhx({
            route: '/test',
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, '{"type":"div","key":null,"props":{"children":"route-error"},"_owner":null,"_store":{}}', 'text/html', 400);
    });

    it('returns buffer (config.contentType=null)', async () => {
        const port = ports.getPort();
        const { jhx } = await buildServer(testServers, port, {
            contentType: null,
            errorHandler: (err) => Buffer.from(err.message, 'utf-8'),
        });

        jhx({
            route: '/test',
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'route-error', 'application/octet-stream', 400);
    });

    it('returns buffer (response header set)', async () => {
        const port = ports.getPort();
        const { jhx } = await buildServer(testServers, port, {
            errorHandler: (err, _req, res) => {
                res.header('Content-Type', 'application/octet-stream');
                return Buffer.from(err.message, 'utf-8');
            },
        });

        jhx({
            route: '/test',
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'route-error', 'application/octet-stream', 400);
    });

    it('returns buffer (fs.readFile; config.contentType=null)', async () => {
        const port = ports.getPort();
        const { jhx } = await buildServer(testServers, port, {
            contentType: null,
            errorHandler: (_err, _req, res) => {
                const filepath = path.join(__dirname, 'data.txt');
                fs.readFile(filepath, (err, buff) => res.send(err || buff));
                return res;
            },
        });

        jhx({
            route: '/test',
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'file-data', 'application/octet-stream', 400);
    });

    it('returns stream (res.writeHead)', async () => {
        const port = ports.getPort();
        const { jhx } = await buildServer(testServers, port, {
            errorHandler: async (_err, _res, res) => {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                const chunks = ['stream', '-', 'ok'];

                for await (const chunk of chunks) {
                    await new Promise((r) => setTimeout(r, 25));
                    res.write(chunk);
                }

                res.end();
            }
        });

        jhx({
            route: '/test',
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'stream-ok', 'text/plain', 400);
    });

    it('returns string', async () => {
        const port = ports.getPort();
        const { jhx } = await buildServer(testServers, port, {
            errorHandler: (err) => err.message,
        });

        jhx({
            route: '/test',
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'route-error', 'text/html', 400);
    });

    it('returns object (config.contentType=null)', async () => {
        const port = ports.getPort();
        const { jhx } = await buildServer(testServers, port, {
            contentType: null,
            errorHandler: (err) => ({ message: err.message }),
        });

        jhx({
            route: '/test',
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, { message: 'route-error' }, 'application/json', 400);
    });

    it('returns object (response header set)', async () => {
        const port = ports.getPort();
        const { jhx } = await buildServer(testServers, port, {
            errorHandler: (err, _req, res) => {
                res.header('Content-Type', 'application/json');
                return { message: err.message };
            },
        });

        jhx({
            route: '/test',
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, { message: 'route-error' }, 'application/json', 400);
    });

    it('returns void', async () => {
        const port = ports.getPort();
        const { jhx } = await buildServer(testServers, port, {
            errorHandler: () => {},
        });

        jhx({
            route: '/test',
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, '', 'text/html', 400);
    });
});
