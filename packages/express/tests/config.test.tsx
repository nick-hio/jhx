import { expect, describe, it, afterAll } from 'bun:test';

import { buildServer, closeServers, expectResponse, PortGenerator, testUrl, ENDPOINT } from './helpers';
import { createJhx } from '../src';

const expectRecord = (v: Record<string, string>) => v; // Compile-time check
const expectString = (v: string) => v; // Compile-time check

const stringifyTestServers: any[] = [];
const route = ENDPOINT;

describe('config.stringify Tests', async () => {
    afterAll(async () => {
        await closeServers(stringifyTestServers);
    });

    const ports = new PortGenerator(20000);

    const { app } = buildServer(stringifyTestServers, ports.getPort());
    const { jhx: jhxDefault } = createJhx(app, {
        prefix: '/stringify-default-test',
    });

    it('default, no change', async () => {
        const result = jhxDefault({ route });
        expectRecord(result);
        expect(typeof result).toBe('object');
    });

    it('default to true', async () => {
        const result = jhxDefault({ route }, { stringify: true });
        expectString(result);
        expect(typeof result).toBe('string');
    });

    it('default to false', async () => {
        const result = jhxDefault({ route }, { stringify: false });
        expectRecord(result);
        expect(typeof result).toBe('object');
    });

    const { jhx: jhxTrue } = createJhx(app, {
        prefix: '/stringify-true-test',
        stringify: true,
    });

    it('true, no change', async () => {
        const result = jhxTrue({ route });
        expectString(result);
        expect(typeof result).toBe('string');
    });

    it('true to false', async () => {
        const result = jhxTrue({ route }, { stringify: false });
        expectRecord(result);
        expect(typeof result).toBe('object');
    });

    const { jhx: jhxFalse } = createJhx(app, {
        prefix: '/stringify-false-test',
        stringify: false,
    });

    it('false, no change ', async () => {
        const result = jhxFalse({ route });
        expectRecord(result);
        expect(typeof result).toBe('object');
    });

    it('false to true', async () => {
        const result = jhxFalse({ route }, { stringify: true });
        expectString(result);
        expect(typeof result).toBe('string');
    });
});

const routesTestServers: any[] = [];

describe('config.routes Tests', async () => {
    afterAll(async () => {
        await closeServers(routesTestServers);
    });

    const ports = new PortGenerator(20100);

    it('GET route', async () => {
        const port = ports.getPort();
        buildServer(routesTestServers, port, {
            routes: { route, handler: () => 'ok' },
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'ok', 'text/html', 200);
    });

    it('POST route', async () => {
        const port = ports.getPort();
        buildServer(routesTestServers, port, {
            routes: { route, handler: () => 'ok', method: 'POST' },
        });

        const res = await fetch(testUrl(port), { method: 'POST' });
        await expectResponse(res, 'ok', 'text/html', 200);
    });

    it('GET & POST routes', async () => {
        const port = ports.getPort();
        buildServer(routesTestServers, port, {
            routes: [
                { route, handler: () => 'ok' },
                { route, handler: () => 'ok', method: 'POST' },
            ],
        });

        const getRes = await fetch(testUrl(port));
        await expectResponse(getRes, 'ok', 'text/html', 200);

        const postRes = await fetch(testUrl(port), { method: 'POST' });
        await expectResponse(postRes, 'ok', 'text/html', 200);
    });

    it('routes cannot use same endpoint', async () => {
        expect(
            async () => {
                const port = ports.getPort();
                buildServer(routesTestServers, port, {
                    routes: [
                        { route, handler: () => 'ok' },
                        { route, handler: () => 'ok' },
                    ],
                });
            }
        ).toThrow(Error);
    });
});
