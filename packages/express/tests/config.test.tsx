import { expect, describe, it, afterAll } from 'bun:test';

import { buildServer, closeServers, expectResponse, PortGenerator } from './helpers';
import { createJhx } from '../src';

const expectRecord = (v: Record<string, string>) => v; // Compile-time check
const expectString = (v: string) => v; // Compile-time check

const stringifyTestServers: any[] = [];

describe('config.stringify Tests', async () => {
    afterAll(async () => {
        await closeServers(stringifyTestServers);
    });

    const ports = new PortGenerator(20000);

    const { app: appDefault } = await buildServer(stringifyTestServers, ports.getPort());
    const { jhx: jhxDefault } = createJhx(appDefault, {
        prefix: '/stringify-default-test',
    });

    it('default, no change', async () => {
        const result = jhxDefault({ route: '/test' });
        expectRecord(result);
        expect(typeof result).toBe('object');
    });

    it('default to true', async () => {
        const result = jhxDefault({ route: '/test' }, { stringify: true });
        expectString(result);
        expect(typeof result).toBe('string');
    });

    it('default to false', async () => {
        const result = jhxDefault({ route: '/test' }, { stringify: false });
        expectRecord(result);
        expect(typeof result).toBe('object');
    });

    const { app: appTrue } = await buildServer(stringifyTestServers, ports.getPort());
    const { jhx: jhxTrue } = createJhx(appTrue, {
        prefix: '/stringify-true-test',
        stringify: true,
    });

    it('true, no change', async () => {
        const result = jhxTrue({ route: '/test' });
        expectString(result);
        expect(typeof result).toBe('string');
    });

    it('true to false', async () => {
        const result = jhxTrue({ route: '/test' }, { stringify: false });
        expectRecord(result);
        expect(typeof result).toBe('object');
    });

    const { app: appFalse } = await buildServer(stringifyTestServers, ports.getPort());
    const { jhx: jhxFalse } = createJhx(appFalse, {
        prefix: '/stringify-false-test',
        stringify: false,
    });

    it('false, no change ', async () => {
        const result = jhxFalse({ route: '/test' });
        expectRecord(result);
        expect(typeof result).toBe('object');
    });

    it('false to true', async () => {
        const result = jhxFalse({ route: '/test' }, { stringify: true });
        expectString(result);
        expect(typeof result).toBe('string');
    });
});

const routesTestServers: any[] = [];
const testUrl = (port: number) => `http://localhost:${port}/_jhx/pre-reg`;

describe('config.routes Tests', async () => {
    afterAll(async () => {
        await closeServers(routesTestServers);
    });

    const ports = new PortGenerator(20100);

    it('pre-registered route (GET)', async () => {
        const port = ports.getPort();
        await buildServer(routesTestServers, port, {
            routes: {
                route: '/pre-reg',
                handler: (_req, res) => res.send('ok'),
            },
        });

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'ok', 'text/html', 200);
    });

    it('pre-registered route (POST)', async () => {
        const port = ports.getPort();
        await buildServer(routesTestServers, port, {
            routes: {
                method: 'POST',
                route: '/pre-reg',
                handler: (_req, res) => res.send('ok'),
            },
        });

        const res = await fetch(testUrl(port), { method: 'POST' });
        await expectResponse(res, 'ok', 'text/html', 200);
    });

    it('pre-registered routes (GET & POST)', async () => {
        const port = ports.getPort();
        await buildServer(routesTestServers, port, {
            routes: [
                {
                    method: 'get',
                    route: '/pre-reg',
                    handler: (_req, res) => res.send('ok'),
                },
                {
                    method: 'POST',
                    route: '/pre-reg',
                    handler: (_req, res) => res.send('ok'),
                },
            ],
        });

        const getRes = await fetch(testUrl(port));
        await expectResponse(getRes, 'ok', 'text/html', 200);

        const postRes = await fetch(testUrl(port), { method: 'POST' });
        await expectResponse(postRes, 'ok', 'text/html', 200);
    });

    it('pre-registered routes cannot use same route', async () => {
        expect(
            async () => {
                const port = ports.getPort();
                await buildServer(routesTestServers, port, {
                    routes: [
                        {
                            route: '/test',
                            handler: () => 'handler-one',
                        },
                        {
                            route: '/test',
                            handler: () => 'handler-two',
                        },
                    ],
                });
            }
        ).toThrow(Error);
    });
});
