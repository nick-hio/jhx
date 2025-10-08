import { describe, expect, it } from 'bun:test';
import { buildServer } from "./build-server";

describe('[jhx-fastify] routing', async () => {
    it('duplicate route handlers use the same route', async () => {
        const fastify = await buildServer();

        fastify.jhx({ handler: () => 'ok' });
        fastify.jhx({ handler: () => 'ok' });

        const allRoutes = fastify.jhx.getRoutes();
        expect(allRoutes).toHaveLength(2);
    });

    it('duplicate route endpoints use the same route', async () => {
        const fastify = await buildServer();

        fastify.jhx({
            route: '/test',
            handler: () => 'handler-one',
        });
        fastify.jhx({
            route: '/test',
            handler: () => 'handler-two',
        });

        const allRoutes = fastify.jhx.getRoutes();
        expect(allRoutes).toHaveLength(2);

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/test' });
        expect(res.body).toBe('handler-one');
        expect(res.statusCode).toBe(200);
    });
});
