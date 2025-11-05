import { describe, it, afterAll } from 'bun:test';
import fs from 'fs';
import path from 'path';

import { buildServer, closeServers, expectResponse, PortGenerator, ENDPOINT } from './helpers';

const testUrl = (port: number) => `http://localhost:${port}/_jhx/test`;
const testServers: any[] = [];
const route = ENDPOINT;

describe('middleware error handling', () => {
    afterAll(async () => {
        await closeServers(testServers);
    });

    const ports = new PortGenerator(20100);

    it('returns sent response', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (err, _req, res) => res.status(500).send(err.message),
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'mw-error', 'text/html', 500);
    });

    it('returns JSX (default)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (err) => <div>{err.message}</div>,
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, '<div>mw-error</div>', 'text/html', 500);
    });

    it('returns JSX (config.render=static)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (err) => <div>{err.message}</div>,
            render: 'static',
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, '<div>mw-error</div>', 'text/html', 500);
    });

    it('returns JSX (config.render=string)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (err) => <div>{err.message}</div>,
            render: 'string',
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, '<div>mw-error</div>', 'text/html', 500);
    });

    it('returns JSX (config.renderError=false)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (err) => <div>{err.message}</div>,
            renderError: false,
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, '{"type":"div","key":null,"props":{"children":"mw-error"},"_owner":null,"_store":{}}', 'text/html', 500);
    });

    it('returns buffer (config.contentType=null)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            contentType: false,
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (err) => Buffer.from(err.message, 'utf-8'),
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'mw-error', 'application/octet-stream', 500);
    });

    it('returns buffer (response header set)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (err, _req, res) => {
                res.header('Content-Type', 'application/octet-stream');
                return Buffer.from(err.message, 'utf-8');
            },
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'mw-error', 'application/octet-stream', 500);
    });

    it('returns buffer (fs.readFile; config.contentType=null)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            contentType: false,
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (_err, _req, res) => {
                const filepath = path.join(__dirname, 'data.txt');
                fs.readFile(filepath, (err, buff) => res.send(err || buff));
                return res;
            },
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'file-data', 'application/octet-stream', 500);
    });

    it('returns blob (config.contentType=null)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            contentType: false,
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: () => Bun.file(path.join(__dirname, 'data.txt')),
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'file-data', 'text/plain;charset=utf-8', 500);
    });

    it('returns stream (res.writeHead)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: async (_err, _res, res) => {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                const chunks = ['stream', '-', 'ok'];

                for await (const chunk of chunks) {
                    await new Promise((r) => setTimeout(r, 25));
                    res.write(chunk);
                }

                res.end();
            }
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'stream-ok', 'text/plain', 500);
    });

    it('returns string', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (err) => err.message,
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'mw-error', 'text/html', 500);
    });

    it('returns object (config.contentType=null)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            contentType: false,
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (err) => ({ message: err.message }),
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, { message: 'mw-error' }, 'application/json', 500);
    });

    it('returns object (response header set)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: (err, _req, res) => {
                res.header('Content-Type', 'application/json');
                return { message: err.message };
            },
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, { message: 'mw-error' }, 'application/json', 500);
    });

    it('returns void', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            middleware: () => {
                throw new Error('mw-error');
            },
            errorHandler: () => {},
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, '', 'text/html', 500);
    });
});
