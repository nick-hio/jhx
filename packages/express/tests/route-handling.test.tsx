import { describe, it, afterAll } from 'bun:test';
import fs from 'fs';
import path from 'path';

import { buildServer, closeServers, expectResponse, PortGenerator, ENDPOINT } from './helpers';

const testUrl = (port: number) => `http://localhost:${port}/_jhx/test`;
const testServers: any[] = [];
const route = ENDPOINT;

describe('route handling', () => {
    afterAll(async () => {
        await closeServers(testServers);
    });

    const ports = new PortGenerator(20600);

    it('returns sent response', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port);

        jhx({
            route,
            handler: (_req, res) => res.send('route-ok')
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'route-ok', 'text/html');
    });

    it('returns JSX (default)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port);

        jhx({
            route,
            handler: () => <div>route-ok</div>,
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, '<div>route-ok</div>', 'text/html');
    });

    it('returns JSX (config.render=static)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            render: 'static',
        });

        jhx({
            route,
            handler: () => <div>route-ok</div>,
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, '<div>route-ok</div>', 'text/html');
    });

    it('returns JSX (config.render=string)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            render: 'string',
        });

        jhx({
            route,
            handler: () => <div>route-ok</div>,
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, '<div>route-ok</div>', 'text/html');
    });

    it('returns JSX (config.render=false)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            render: false,
        });

        jhx({
            route,
            handler: () => <div>route-ok</div>,
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, '{"type":"div","key":null,"props":{"children":"route-ok"},"_owner":null,"_store":{}}', 'text/html');
    });

    it('returns buffer (config.contentType=null)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            contentType: null,
        });

        jhx({
            route,
            handler: () => Buffer.from('route-ok', 'utf-8'),
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'route-ok', 'application/octet-stream');
    });

    it('returns buffer (response header set)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port);

        jhx({
            route,
            handler: (_req, res) => {
                res.header('Content-Type', 'application/octet-stream');
                return Buffer.from('route-ok', 'utf-8');
            },
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'route-ok', 'application/octet-stream');
    });

    it('returns buffer (fs.readFile; config.contentType=null)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            contentType: null,
        });

        jhx({
            route,
            handler: (_req, res) => {
                const filepath = path.join(__dirname, 'data.txt');
                fs.readFile(filepath, (err, buff) => res.send(err || buff));
                return res;
            },
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'file-data', 'application/octet-stream');
    });

    it('returns stream (res.writeHead)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port);

        jhx({
            route,
            handler: async (_req, res) => {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                const chunks = ['stream', '-', 'ok'];

                for await (const chunk of chunks) {
                    await new Promise((r) => setTimeout(r, 25));
                    res.write(chunk);
                }

                res.end();
            },
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'stream-ok', 'text/plain');
    });

    it('returns string', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port);

        jhx({
            route,
            handler: () => 'route-ok',
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'route-ok', 'text/html');
    });

    it('returns object (config.contentType=null)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            contentType: null,
        });

        jhx({
            route,
            handler: () => ({ message: 'route-ok' }),
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, { message: 'route-ok' }, 'application/json');
    });

    it('returns object (response header set)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port);

        jhx({
            route,
            handler: (_req, res) => {
                res.header('Content-Type', 'application/json; charset=utf-8');
                return { message: 'route-ok' }
            },
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, { message: 'route-ok' }, 'application/json');
    });

    it('returns void', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port);

        jhx({
            route,
            handler: () => {},
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, '', 'text/html');
    });

    it('throws error', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port);

        jhx({
            route,
            handler: () => {
                throw new Error('route-error');
            },
        });

        const res = await fetch(testUrl(port));
        await expectResponse(
            res,
            '<!DOCTYPE html>\n<html lang="en">\n'
            + '<head>\n<meta charset="utf-8">\n<title>Error</title>\n</head>\n'
            + '<body>\n<pre>JhxServerError: Unexpected jhx route error</pre>\n</body>\n'
            + '</html>\n',
            'text/html',
            500
        );
    });
});
