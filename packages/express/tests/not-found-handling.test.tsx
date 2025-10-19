import { describe, it, afterAll } from 'bun:test';
import fs from 'fs';
import path from 'path';

import { buildServer, closeServers, expectResponse, PortGenerator } from './helpers';

const testUrl = (port: number) => `http://localhost:${port}/_jhx/dne`;
const testServers: any[] = [];

describe('not found handling', () => {
    afterAll(async () => {
        await closeServers(testServers);
    });

    const ports = new PortGenerator(20300);

    it('returns sent response', async () => {
        const port = ports.getPort();
        buildServer(testServers, port, {
            notFoundHandler: (_req, res) => res.send('dne'),
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'dne', 'text/html', 404);
    });

    it('returns JSX (default)', async () => {
        const port = ports.getPort();
        buildServer(testServers, port, {
            notFoundHandler: () => <div>dne</div>,
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, '<div>dne</div>', 'text/html', 404);
    });

    it('returns JSX (config.render=static)', async () => {
        const port = ports.getPort();
        buildServer(testServers, port, {
            notFoundHandler: () => <div>dne</div>,
            render: 'static',
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, '<div>dne</div>', 'text/html', 404);
    });

    it('returns JSX (config.render=string)', async () => {
        const port = ports.getPort();
        buildServer(testServers, port, {
            notFoundHandler: () => <div>dne</div>,
            render: 'string',
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, '<div>dne</div>', 'text/html', 404);
    });

    it('returns JSX (config.renderNotFound=false)', async () => {
        const port = ports.getPort();
        buildServer(testServers, port, {
            renderNotFound: false,
            notFoundHandler: () => <div>dne</div>,
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, '{"type":"div","key":null,"props":{"children":"dne"},"_owner":null,"_store":{}}', 'text/html', 404);
    });

    it('returns buffer (config.contentType=null)', async () => {
        const port = ports.getPort();
        buildServer(testServers, port, {
            contentType: null,
            notFoundHandler: () => Buffer.from('dne', 'utf-8'),
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'dne', 'application/octet-stream', 404);
    });

    it('returns buffer (response header set)', async () => {
        const port = ports.getPort();
        buildServer(testServers, port, {
            notFoundHandler: (_req, res) => {
                res.header('Content-Type', 'application/octet-stream');
                return Buffer.from('dne', 'utf-8');
            },
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'dne', 'application/octet-stream', 404);
    });

    it('returns buffer (fs.readFile; config.contentType=null)', async () => {
        const port = ports.getPort();
        buildServer(testServers, port, {
            contentType: null,
            notFoundHandler: (_req, res) => {
                const filepath = path.join(__dirname, 'data.txt');
                fs.readFile(filepath, (err, buff) => res.send(err || buff));
                return res;
            },
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'file-data', 'application/octet-stream', 404);
    });

    it('returns blob (config.contentType=null)', async () => {
        const port = ports.getPort();
        buildServer(testServers, port, {
            contentType: null,
            notFoundHandler: () => Bun.file(path.join(__dirname, 'data.txt')),
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'file-data', 'text/plain;charset=utf-8', 404);
    });

    it('returns stream (res.writeHead)', async () => {
        const port = ports.getPort();
        buildServer(testServers, port, {
            notFoundHandler: async (_req, res) => {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                const chunks = ['stream', '-', 'ok'];

                for await (const chunk of chunks) {
                    await new Promise((r) => setTimeout(r, 25));
                    res.write(chunk);
                }

                res.end();
            },
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'stream-ok', 'text/plain', 404);
    });

    it('returns string', async () => {
        const port = ports.getPort();
        buildServer(testServers, port, {
            notFoundHandler: () => 'dne',
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'dne', 'text/html', 404);
    });

    it('returns object (config.contentType=null)', async () => {
        const port = ports.getPort();
        buildServer(testServers, port, {
            contentType: null,
            notFoundHandler: () => ({ message: 'dne' }),
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, { message: 'dne' }, 'application/json', 404);
    });

    it('returns object (response header set)', async () => {
        const port = ports.getPort();
        buildServer(testServers, port, {
            notFoundHandler: (_req, res) => {
                res.header('Content-Type', 'application/json; charset=utf-8');
                return { message: 'dne' }
            },
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, { message: 'dne' }, 'application/json', 404);
    });

    it('returns void', async () => {
        const port = ports.getPort();
        buildServer(testServers, port, {
            notFoundHandler: () => {},
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, '', 'text/html', 404);
    });
});
