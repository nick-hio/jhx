import { expect, describe, it } from 'bun:test';

import { buildServer, expectResponse, testReq, ENDPOINT } from './helpers';

const route = ENDPOINT;

describe('routing tests', async () => {
    it('duplicate route handlers use the same generated endpoint', async () => {
        const { jhx } = buildServer();

        jhx({ handler: () => 'ok' });
        jhx({ handler: () => 'ok' });
        jhx({ handler: () => 'ok' });

        expect(jhx.getRoutes()).toHaveLength(2); // ['/example', '/example/']
    });

    it('duplicate route endpoints use the first handler', async () => {
        const { app, jhx } = buildServer();

        jhx({ route, handler: () => 'handler-one' });
        jhx({ route, handler: () => 'handler-two' });
        jhx({ route, handler: () => 'handler-three' });

        expect(jhx.getRoutes()).toHaveLength(2); // ['/test', '/test/']

        const res = await app.request(testReq());
        await expectResponse(res, 'handler-one', 'text/html');
    });
});
