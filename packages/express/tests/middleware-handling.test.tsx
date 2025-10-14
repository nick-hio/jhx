import { describe, it, afterAll } from 'bun:test';
import fs from 'fs';
import path from 'path';

import { buildServer, closeServers, expectResponse, PortGenerator } from './helpers';

const testUrl = (port: number) => `http://localhost:${port}/_jhx/test`;
const testServers: any[] = [];

describe('middleware handling', () => {
    afterAll(async () => {
        await closeServers(testServers);
    });

    const ports = new PortGenerator(20000);

    it('returns sent response', async () => {
        const port = ports.getPort();
        const { jhx } = await buildServer(testServers, port, {
            middleware: (_req, res) => res.send('middleware-ok'),
        });

        jhx({ route: '/test', handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'middleware-ok', 'text/html');
    });

    it('returns JSX (default)', async () => {
        const port = ports.getPort();
        const { jhx } = await buildServer(testServers, port, {
            middleware: () => <div>middleware-ok</div>,
        });

        jhx({ route: '/test', handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, '<div>middleware-ok</div>', 'text/html');
    });

    it('returns JSX (config.render=static)', async () => {
        const port = ports.getPort();
        const { jhx } = await buildServer(testServers, port, {
            middleware: () => <div>middleware-ok</div>,
            render: 'static',
        });

        jhx({ route: '/test', handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, '<div>middleware-ok</div>', 'text/html');
    });

    it('returns JSX (config.render=string)', async () => {
        const port = ports.getPort();
        const { jhx } = await buildServer(testServers, port, {
            middleware: () => <div>middleware-ok</div>,
            render: 'string',
        });

        jhx({ route: '/test', handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, '<div>middleware-ok</div>', 'text/html');
    });

    it('returns JSX (config.renderMiddleware=false)', async () => {
        const port = ports.getPort();
        const { jhx } = await buildServer(testServers, port, {
            renderMiddleware: false,
            middleware: () => <div>middleware-ok</div>,
        });

        jhx({ route: '/test', handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, '{"type":"div","key":null,"props":{"children":"middleware-ok"},"_owner":null,"_store":{}}', 'text/html');
    });

    it('returns buffer (config.contentType=null)', async () => {
        const port = ports.getPort();
        const { jhx } = await buildServer(testServers, port, {
            contentType: null,
            middleware: () => Buffer.from('middleware-ok', 'utf-8'),
        });

        jhx({ route: '/test', handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'middleware-ok', 'application/octet-stream');
    });

    it('returns buffer (response header set)', async () => {
        const port = ports.getPort();
        const { jhx } = await buildServer(testServers, port, {
            middleware: (_req, res) => {
                res.header('Content-Type', 'application/octet-stream');
                return Buffer.from('middleware-ok', 'utf-8');
            },
        });

        jhx({ route: '/test', handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'middleware-ok', 'application/octet-stream');
    });

    it('returns buffer (fs.readFile; config.contentType=null)', async () => {
        const port = ports.getPort();
        const { jhx } = await buildServer(testServers, port, {
            contentType: null,
            middleware: (_req, res) => {
                const filepath = path.join(__dirname, 'data.txt');
                fs.readFile(filepath, (err, buff) => res.send(err || buff));
                return res;
            },
        });

        jhx({ route: '/test', handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'file-data', 'application/octet-stream');
    });

    it('returns stream (res.writeHead)', async () => {
        const port = ports.getPort();
        const { jhx } = await buildServer(testServers, port, {
            middleware: async (_req, res) => {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                const chunks = ['stream', '-', 'ok'];

                for await (const chunk of chunks) {
                    await new Promise((r) => setTimeout(r, 25));
                    res.write(chunk);
                }

                res.end();
            },
        });

        jhx({ route: '/test', handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'stream-ok', 'text/plain');
    });

    it('returns string', async () => {
        const port = ports.getPort();
        const { jhx } = await buildServer(testServers, port, {
            middleware: () => 'middleware-ok',
        });

        jhx({ route: '/test', handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'middleware-ok', 'text/html');
    });

    it('returns object (config.contentType=null)', async () => {
        const port = ports.getPort();
        const { jhx } = await buildServer(testServers, port, {
            contentType: null,
            middleware: () => ({ message: 'middleware-ok' }),
        });

        jhx({ route: '/test', handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, { message: 'middleware-ok' }, 'application/json');
    });

    it('returns object (response header set)', async () => {
        const port = ports.getPort();
        const { jhx } = await buildServer(testServers, port, {
            middleware: (_req, res) => {
                res.header('Content-Type', 'application/json; charset=utf-8');
                return { message: 'middleware-ok' }
            },
        });

        jhx({ route: '/test', handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, { message: 'middleware-ok' }, 'application/json');
    });

    it('returns void', async () => {
        const port = ports.getPort();
        const { jhx } = await buildServer(testServers, port, {
            middleware: () => {},
        });

        jhx({
            route: '/test',
            handler: () => 'ok',
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'ok', 'text/html');
    });

    it('throws error', async () => {
        const port = ports.getPort();
        const { jhx } = await buildServer(testServers, port, {
            middleware: () => {
                throw new Error('mw-error');
            },
        });

        jhx({ route: '/test', handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(
            res,
            '<!DOCTYPE html>\n<html lang="en">\n'
            + '<head>\n<meta charset="utf-8">\n<title>Error</title>\n</head>\n'
            + '<body>\n<pre>JhxServerError: Unexpected jhx middleware error</pre>\n</body>\n'
            + '</html>\n',
            'text/html',
            500
        );
    });
});
