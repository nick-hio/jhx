import { expect, describe, it } from 'bun:test';

import { buildServer, ENDPOINT } from './helpers';

const route = ENDPOINT;

describe('utilities', async () => {
    it('jhx.addRoute Function', async () => {
        const { jhx } = await buildServer();
        expect(jhx.getRoutes()).toHaveLength(0);

        jhx.addRoute({ route, handler: () => 'ok' });
        expect(jhx.getRoutes()).toHaveLength(2);
    });

    it('jhx.addRoutes Function', async () => {
        const { jhx } = await buildServer();
        expect(jhx.getRoutes()).toHaveLength(0);

        jhx.addRoutes([
            { route: '/test1', handler: () => 'ok' },
            { route: '/test2', handler: () => 'ok' },
        ]);
        expect(jhx.getRoutes()).toHaveLength(4);
    });

    it('jhx.clearRoutes Function', async () => {
        const { jhx } = await buildServer();

        jhx({ route, handler: () => 'ok' });
        expect(jhx.getRoutes()).toHaveLength(2);

        jhx.clearRoutes();
        expect(jhx.getRoutes()).toHaveLength(0);
    });

    it('jhx.getRoute Function', async () => {
        const { jhx } = await buildServer();

        jhx({ route, handler: () => 'ok' });

        const route1a = jhx.getRoute('get', '/test');
        expect(route1a).toEqual(
            expect.objectContaining({
                method: 'GET',
                route: '/_jhx/test',
                handler: expect.any(Function),
            }),
        );

        const route1b = jhx.getRoute('get', '/test/');
        expect(route1b).toEqual(
            expect.objectContaining({
                method: 'GET',
                route: '/_jhx/test/',
                handler: expect.any(Function),
            }),
        );
    });

    it('jhx.getRoutes Function', async () => {
        const { jhx } = await buildServer();

        jhx({ route: '/test1', handler: () => 'ok' });
        jhx({ route: '/test2', handler: () => 'ok' });

        const routes = jhx.getRoutes();
        expect(routes).toHaveLength(4);

        const route1a = routes[0];
        expect(route1a).toEqual(
            expect.objectContaining({
                method: 'GET',
                route: '/_jhx/test1',
                handler: expect.any(Function),
            }),
        );

        const route1b = routes[1];
        expect(route1b).toEqual(
            expect.objectContaining({
                method: 'GET',
                route: '/_jhx/test1/',
                handler: expect.any(Function),
            }),
        );

        const route2a = routes[2];
        expect(route2a).toEqual(
            expect.objectContaining({
                method: 'GET',
                route: '/_jhx/test2',
                handler: expect.any(Function),
            }),
        );

        const route2b = routes[3];
        expect(route2b).toEqual(
            expect.objectContaining({
                method: 'GET',
                route: '/_jhx/test2/',
                handler: expect.any(Function),
            }),
        );
    });

    it('jhx.hasRoute Function', async () => {
        const { jhx } = await buildServer();

        jhx({ route, handler: () => 'ok' });

        expect(jhx.hasRoute('get', '/test')).toBe(true);
        expect(jhx.hasRoute('post', '/test')).toBe(false);
    });

    it('jhx.removeRoute Function', async () => {
        const { jhx } = await buildServer();

        jhx({ route, handler: () => 'ok' });
        expect(jhx.getRoutes()).toHaveLength(2);

        jhx.removeRoute('get', '/test');
        expect(jhx.getRoutes()).toHaveLength(0);
    });
});
