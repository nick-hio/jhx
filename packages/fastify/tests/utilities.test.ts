import { describe, expect, it } from 'bun:test';
import { buildServer } from "./build-server";

describe('[jhx-fastify] initialization', async () => {
    it('jhx.addRoute', async () => {
        const fastify = await buildServer();

        expect(fastify.jhx.getRoutes()).toHaveLength(0);

        fastify.jhx.addRoute({
            route: '/test',
            handler: () => 'ok',
        });
        expect(fastify.jhx.getRoutes()).toHaveLength(2);
    });

    it('jhx.addRoutes', async () => {
        const fastify = await buildServer();

        expect(fastify.jhx.getRoutes()).toHaveLength(0);

        fastify.jhx.addRoutes([
            {
                route: '/test1',
                handler: () => 'ok',
            },
            {
                route: '/test2',
                handler: () => 'ok',
            }
        ]);
        expect(fastify.jhx.getRoutes()).toHaveLength(4);
    });

    it('jhx.clearRoutes', async () => {
        const fastify = await buildServer();

        fastify.jhx({
            route: '/test',
            handler: () => 'ok',
        })
        expect(fastify.jhx.getRoutes()).toHaveLength(2);

        fastify.jhx.clearRoutes();
        expect(fastify.jhx.getRoutes()).toHaveLength(0);
    });

    it('jhx.getRoute', async () => {
        const fastify = await buildServer();

        fastify.jhx({
            route: '/test',
            handler: () => 'ok',
        })

        const route1a = fastify.jhx.getRoute('get', '/test');
        expect(route1a).toEqual(
            expect.objectContaining({
                method: 'GET',
                route: '/_jhx/test',
                handler: expect.any(Function),
            })
        );

        const route1b = fastify.jhx.getRoute('get', '/test/');
        expect(route1b).toEqual(
            expect.objectContaining({
                method: 'GET',
                route: '/_jhx/test/',
                handler: expect.any(Function),
            })
        );
    });

    it('jhx.getRoutes', async () => {
        const fastify = await buildServer();

        fastify.jhx({
            route: '/test1',
            handler: () => 'ok',
        })
        fastify.jhx({
            route: '/test2',
            handler: () => 'ok',
        })

        const routes = fastify.jhx.getRoutes();
        expect(routes).toHaveLength(4);

        const route1a = routes[0];
        expect(route1a).toEqual(
            expect.objectContaining({
                method: 'GET',
                route: '/_jhx/test1',
                handler: expect.any(Function),
            })
        );

        const route1b = routes[1];
        expect(route1b).toEqual(
            expect.objectContaining({
                method: 'GET',
                route: '/_jhx/test1/',
                handler: expect.any(Function),
            })
        );

        const route2a = routes[2];
        expect(route2a).toEqual(
            expect.objectContaining({
                method: 'GET',
                route: '/_jhx/test2',
                handler: expect.any(Function),
            })
        );

        const route2b = routes[3];
        expect(route2b).toEqual(
            expect.objectContaining({
                method: 'GET',
                route: '/_jhx/test2/',
                handler: expect.any(Function),
            })
        );
    });

    it('jhx.hasRoute', async () => {
        const fastify = await buildServer();

        fastify.jhx({
            route: '/test',
            handler: () => 'ok',
        })

        expect(fastify.jhx.hasRoute('get', '/test')).toBe(true);
        expect(fastify.jhx.hasRoute('post', '/test')).toBe(false);
    });

    it('jhx.removeRoute', async () => {
        const fastify = await buildServer();

        fastify.jhx({
            route: '/test',
            handler: () => 'ok',
        })
        expect(fastify.jhx.getRoutes()).toHaveLength(2);

        fastify.jhx.removeRoute('get', '/test');
        expect(fastify.jhx.getRoutes()).toHaveLength(0);
    });
});
