import { expect, describe, it, afterAll } from 'bun:test';

import { buildServer, closeServers, expectResponse, PortGenerator } from './helpers';

const testUrl = (port: number) => `http://localhost:${port}/_jhx/test`;
const testServers: any[] = [];

describe('routing', async () => {
    afterAll(async () => {
        await closeServers(testServers);
    });

    const ports = new PortGenerator(20000);

    it('duplicate route handlers use the same route', async () => {
        const port = ports.getPort();
        const { jhx } = await buildServer(testServers, port);

        jhx({ handler: () => 'ok' });
        jhx({ handler: () => 'ok' });

        expect(jhx.getRoutes()).toHaveLength(2);
    });

    it('duplicate route endpoints use the same route', async () => {
        const port = ports.getPort();
        const { jhx } = await buildServer(testServers, port);

        jhx({
            route: '/test',
            handler: () => 'handler-one',
        });
        jhx({
            route: '/test',
            handler: () => 'handler-two',
        });

        expect(jhx.getRoutes()).toHaveLength(2);

        const res = await fetch(testUrl(port));
        await expectResponse(res, 'handler-one', 'text/html');
    });
});
