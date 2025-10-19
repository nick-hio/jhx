import { describe, expect, it } from 'bun:test';

import { buildServer, expectResponse, ENDPOINT } from './helpers';

const route = ENDPOINT;
const url = `/_jhx${route}`;

describe('routing', async () => {
    it('duplicate route handlers use the same route', async () => {
        const fastify = await buildServer();

        fastify.jhx({ handler: () => 'ok' });
        fastify.jhx({ handler: () => 'ok' });
        expect(fastify.jhx.getRoutes()).toHaveLength(2);
    });

    it('duplicate route endpoints use the same route', async () => {
        const fastify = await buildServer();

        fastify.jhx({ route, handler: () => 'handler-one' });
        fastify.jhx({ route, handler: () => 'handler-two' });
        expect(fastify.jhx.getRoutes()).toHaveLength(2);

        const res = await fastify.inject({ method: 'GET', url });
        expectResponse(res, 'handler-one', 'text/html');
    });
});
