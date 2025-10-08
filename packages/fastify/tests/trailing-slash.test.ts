import { describe, it, expect } from 'bun:test';
import { buildServer } from './build-server';

describe('[jhx-fastify] utilities & config.trailingSlash="slash"', async () => {
    it('jhx.addRoute', async () => {
        const fastify = await buildServer({
            trailingSlash: 'slash',
        });
        expect(fastify.jhx.getRoutes()).toHaveLength(0);

        fastify.jhx.addRoute({
            route: '/test',
            handler: () => 'ok',
        });
        expect(fastify.jhx.getRoutes()).toHaveLength(1);
    });

    it('jhx.addRoutes', async () => {
        const fastify = await buildServer({
            trailingSlash: 'slash',
        });
        expect(fastify.jhx.getRoutes()).toHaveLength(0);

        fastify.jhx.addRoutes([
            { route: '/test1', handler: () => 'ok' },
            { route: '/test2', handler: () => 'ok' },
        ]);
        expect(fastify.jhx.getRoutes()).toHaveLength(2);
    });

    it('jhx.clearRoutes', async () => {
        const fastify = await buildServer({
            trailingSlash: 'slash',
        });

        fastify.jhx({
            route: '/test',
            handler: () => 'ok',
        })
        expect(fastify.jhx.getRoutes()).toHaveLength(1);

        fastify.jhx.clearRoutes();
        expect(fastify.jhx.getRoutes()).toHaveLength(0);
    });

    it('jhx.getRoutes', async () => {
        const fastify = await buildServer({
            trailingSlash: 'slash',
        });

        fastify.jhx({
            route: '/test1',
            handler: () => 'ok',
        })
        fastify.jhx({
            route: '/test2',
            handler: () => 'ok',
        })

        const routes = fastify.jhx.getRoutes();
        expect(routes).toHaveLength(2);

        const route1 = routes[0];
        expect(route1).toEqual(
            expect.objectContaining({
                method: 'GET',
                route: '/_jhx/test1/',
                handler: expect.any(Function),
            })
        );

        const route2 = routes[1];
        expect(route2).toEqual(
            expect.objectContaining({
                method: 'GET',
                route: '/_jhx/test2/',
                handler: expect.any(Function),
            })
        );
    });

    it('jhx.removeRoute', async () => {
        const fastify = await buildServer({
            trailingSlash: 'slash',
        });

        fastify.jhx({
            route: '/test',
            handler: () => 'ok',
        })
        expect(fastify.jhx.getRoutes()).toHaveLength(1);

        fastify.jhx.removeRoute('get', '/test');
        expect(fastify.jhx.getRoutes()).toHaveLength(0);
    });
});

describe('[jhx-fastify] utilities & config.trailingSlash="no-slashes"', async () => {
    it('jhx.addRoute', async () => {
        const fastify = await buildServer({
            trailingSlash: 'no-slash',
        });

        expect(fastify.jhx.getRoutes()).toHaveLength(0);

        fastify.jhx.addRoute({
            route: '/test',
            handler: () => 'ok',
        });
        expect(fastify.jhx.getRoutes()).toHaveLength(1);
    });

    it('jhx.addRoutes', async () => {
        const fastify = await buildServer({
            trailingSlash: 'no-slash',
        });
        expect(fastify.jhx.getRoutes()).toHaveLength(0);

        fastify.jhx.addRoutes([
            { route: '/test1', handler: () => 'ok' },
            { route: '/test2', handler: () => 'ok' },
        ]);
        expect(fastify.jhx.getRoutes()).toHaveLength(2);
    });

    it('jhx.clearRoutes', async () => {
        const fastify = await buildServer({
            trailingSlash: 'no-slash',
        });

        fastify.jhx({
            route: '/test',
            handler: () => 'ok',
        })
        expect(fastify.jhx.getRoutes()).toHaveLength(1);

        fastify.jhx.clearRoutes();
        expect(fastify.jhx.getRoutes()).toHaveLength(0);
    });

    it('jhx.getRoutes', async () => {
        const fastify = await buildServer({
            trailingSlash: 'no-slash',
        });

        fastify.jhx({
            route: '/test1',
            handler: () => 'ok',
        })
        fastify.jhx({
            route: '/test2',
            handler: () => 'ok',
        })

        const routes = fastify.jhx.getRoutes();
        expect(routes).toHaveLength(2);

        const route1 = routes[0];
        expect(route1).toEqual(
            expect.objectContaining({
                method: 'GET',
                route: '/_jhx/test1',
                handler: expect.any(Function),
            })
        );

        const route2 = routes[1];
        expect(route2).toEqual(
            expect.objectContaining({
                method: 'GET',
                route: '/_jhx/test2',
                handler: expect.any(Function),
            })
        );
    });

    it('jhx.removeRoute', async () => {
        const fastify = await buildServer({
            trailingSlash: 'no-slash',
        });

        fastify.jhx({
            route: '/test',
            handler: () => 'ok',
        })
        expect(fastify.jhx.getRoutes()).toHaveLength(1);

        fastify.jhx.removeRoute('get', '/test');
        expect(fastify.jhx.getRoutes()).toHaveLength(0);
    });
});
