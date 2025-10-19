import { describe, it, afterAll } from 'bun:test';
import fs from 'fs';
import path from 'path';

import { buildServer, closeServers, expectResponse, PortGenerator, ENDPOINT } from './helpers';

const testUrl = (port: number) => `http://localhost:${port}/_jhx/test`;
const testServers: any[] = [];
const route = ENDPOINT;

describe('middleware handling', () => {
    afterAll(async () => {
        await closeServers(testServers);
    });

    const ports = new PortGenerator(20200);

    it('returns sent response', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            middleware: (_req, res) => res.send('middleware-ok'),
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'middleware-ok', 'text/html');
    });

    it('returns JSX (default)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            middleware: () => <div>middleware-ok</div>,
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, '<div>middleware-ok</div>', 'text/html');
    });

    it('returns JSX (config.render=static)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            middleware: () => <div>middleware-ok</div>,
            render: 'static',
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, '<div>middleware-ok</div>', 'text/html');
    });

    it('returns JSX (config.render=string)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            middleware: () => <div>middleware-ok</div>,
            render: 'string',
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, '<div>middleware-ok</div>', 'text/html');
    });

    it('returns JSX (config.renderMiddleware=false)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            renderMiddleware: false,
            middleware: () => <div>middleware-ok</div>,
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, '{"type":"div","key":null,"props":{"children":"middleware-ok"},"_owner":null,"_store":{}}', 'text/html');
    });

    it('returns buffer (config.contentType=null)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            contentType: null,
            middleware: () => Buffer.from('middleware-ok', 'utf-8'),
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'middleware-ok', 'application/octet-stream');
    });

    it('returns buffer (response header set)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            middleware: (_req, res) => {
                res.header('Content-Type', 'application/octet-stream');
                return Buffer.from('middleware-ok', 'utf-8');
            },
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'middleware-ok', 'application/octet-stream');
    });

    it('returns buffer (fs.readFile; config.contentType=null)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            contentType: null,
            middleware: (_req, res) => {
                const filepath = path.join(__dirname, 'data.txt');
                fs.readFile(filepath, (err, buff) => res.send(err || buff));
                return res;
            },
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'file-data', 'application/octet-stream');
    });

    it('returns blob (config.contentType=null)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            contentType: null,
            middleware: () => Bun.file(path.join(__dirname, 'data.txt')),
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'file-data', 'text/plain;charset=utf-8');
    });

    it('returns stream (res.writeHead)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
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

        jhx({ route, handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'stream-ok', 'text/plain');
    });

    it('returns string', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            middleware: () => 'middleware-ok',
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'middleware-ok', 'text/html');
    });

    it('returns object (config.contentType=null)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            contentType: null,
            middleware: () => ({ message: 'middleware-ok' }),
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, { message: 'middleware-ok' }, 'application/json');
    });

    it('returns object (response header set)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            middleware: (_req, res) => {
                res.header('Content-Type', 'application/json; charset=utf-8');
                return { message: 'middleware-ok' }
            },
        });

        jhx({ route, handler: () => 'should-not-run' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, { message: 'middleware-ok' }, 'application/json');
    });

    it('returns void', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            middleware: () => {},
        });

        jhx({
            route,
            handler: () => 'ok',
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'ok', 'text/html');
    });

    it('throws error', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            middleware: () => {
                throw new Error('mw-error');
            },
        });

        jhx({ route, handler: () => 'should-not-run' });

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
