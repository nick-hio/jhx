import { expect, describe, it, afterAll } from 'bun:test';

import { buildServer, closeServers, expectResponse, PortGenerator } from './helpers';

const route = '/test';
const testUrl = (port: number) => `http://localhost:${port}/_jhx${route}`;
const testServers: any[] = [];

describe('routing tests', async () => {
    afterAll(async () => {
        await closeServers(testServers);
    });

    const ports = new PortGenerator(20700);

    it('duplicate route handlers use the same generated endpoint', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port);

        jhx({ handler: () => 'ok' });
        jhx({ handler: () => 'ok' });
        jhx({ handler: () => 'ok' });

        expect(jhx.getRoutes()).toHaveLength(2); // ['/example', '/example/']
    });

    it('duplicate route endpoints use the first handler', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port);

        jhx({ route, handler: () => 'handler-one' });
        jhx({ route, handler: () => 'handler-two' });
        jhx({ route, handler: () => 'handler-three' });

        expect(jhx.getRoutes()).toHaveLength(2); // ['/test', '/test/']

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'handler-one', 'text/html');
    });
});
