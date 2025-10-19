import { describe, it, afterAll } from 'bun:test';
import fs from 'fs';
import path from 'path';

import { buildServer, closeServers, expectResponse, PortGenerator, ENDPOINT } from './helpers';

const route = ENDPOINT;
const testUrl = (port: number) => `http://localhost:${port}/_jhx${route}`;
const testServers: any[] = [];

describe('render handling', () => {
    afterAll(async () => {
        await closeServers(testServers);
    });

    const ports = new PortGenerator(20400);

    it('returns sent response', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            render: (payload, _req, res) => res.send(payload + '-rendered'),
        });

        jhx({ route, handler: () => 'response' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'response-rendered', 'text/html');
    });

    it('returns buffer (config.contentType=null)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            contentType: null,
            render: (payload) => Buffer.from(payload + '-rendered', 'utf-8'),
        });

        jhx({ route, handler: () => 'response' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'response-rendered', 'application/octet-stream');
    });

    it('returns buffer (response header set)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            render: (payload, _req, res) => {
                res.header('content-type', 'application/octet-stream');
                return Buffer.from(payload + '-rendered', 'utf-8');
            },
        });

        jhx({ route, handler: () => 'response' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'response-rendered', 'application/octet-stream');
    });

    it('returns buffer (fs.readFile; config.contentType=null)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            contentType: null,
            render: (_payload, _req, res) => {
                const filepath = path.join(__dirname, 'data.txt');
                fs.readFile(filepath, (err, buff) => res.send(err || buff));
                return res;
            },
        });

        jhx({ route, handler: () => 'response' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'file-data', 'application/octet-stream');
    });

    it('returns blob (config.contentType=null)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            contentType: null,
            render: () => Bun.file(path.join(__dirname, 'data.txt')),
        });

        jhx({ route, handler: () => 'response' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'file-data', 'text/plain;charset=utf-8');
    });

    it('returns stream (res.writeHead)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            render: async (payload, _req, res) => {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                const chunks = [payload, '-', 'rendered'];

                for await (const chunk of chunks) {
                    await new Promise((r) => setTimeout(r, 25));
                    res.write(chunk);
                }

                res.end();
            },
        });

        jhx({ route, handler: () => 'response' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'response-rendered', 'text/plain');
    });

    it('returns string', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            render: (payload) => payload + '-rendered',
        });

        jhx({ route, handler: () => 'response' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'response-rendered', 'text/html');
    });

    it('returns object (config.contentType=null)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            contentType: null,
            render: (payload) => ({ message: payload + '-rendered' }),
        });

        jhx({ route, handler: () => 'response' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, { message: 'response-rendered' }, 'application/json');
    });

    it('returns object (response header set)', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            render: (payload, _req, res) => {
                res.header('Content-Type', 'application/json; charset=utf-8');
                return { message: payload + '-rendered' }
            },
        });

        jhx({ route, handler: () => 'response' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, { message: 'response-rendered' }, 'application/json');
    });

    it('returns void', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            render: () => {},
        });

        jhx({ route, handler: () => 'response' });

        const res = await fetch(testUrl(port));
        await expectResponse(res, '', 'text/html');
    });

    it('throws error', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port, {
            render: () => {
                throw new Error('render-error');
            },
        });

        jhx({ route, handler: () => 'response' });

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
