import { describe, it } from 'bun:test';
import { Elysia } from 'elysia';
import { renderToStaticMarkup } from 'react-dom/server';

import { buildServer, expectResponse, testReq, ENDPOINT } from './helpers';
import { elysiaJhx } from '../src';

const route = ENDPOINT;

describe('elysia context', async () => {
    it('returns ctx.status', async () => {
        const { app, jhx } = buildServer();

        jhx({ route, handler: (ctx) => ctx.status(201, 'ok') });

        const res = await app.fetch(testReq());
        await expectResponse(res, 'ok', 'text/html', 201);
    });

    it('ctx.set.status changes response', async () => {
        const { app, jhx } = buildServer();

        jhx({ route, handler: (ctx) => {
            ctx.set.status = 201;
            ctx.set.headers['content-type'] = 'text/plain';
            return 'ok';
        } });

        const res = await app.fetch(testReq());
        await expectResponse(res, 'ok', 'text/plain', 201);
    });

    it('ctx.status cannot change response', async () => {
        const { app, jhx } = buildServer();

        jhx({ route, handler: (ctx) => {
            ctx.status(201)
            ctx.set.headers['content-type'] = 'text/plain';
            return 'ok';
        } });

        const res = await app.fetch(testReq());
        await expectResponse(res, 'ok', 'text/plain', 200); // `ctx.status` cannot change the response code.
    });

    it('function exists', async () => {
        const app = new Elysia()
            .use(elysiaJhx())
            // @ts-expect-error: 'jhx' decoration is not type-safe.
            .get('/', ({ jhx }) => {
                jhx({ route, handler: () => 'handler-one-return' });
                jhx({ route: '/new-endpoint', handler: () => 'handler-two-return' });

                return new Response('ok');
            });

        const rootRes = await app.fetch(new Request(`http://localhost/`));
        await expectResponse(rootRes, 'ok');

        const routeOneRes = await app.fetch(testReq());
        await expectResponse(routeOneRes, 'handler-one-return', 'text/html');

        const routeTwoRes = await app.fetch(new Request(`http://localhost/_jhx/new-endpoint`));
        await expectResponse(routeTwoRes, 'handler-two-return', 'text/html');
    });

    it('component exists', async () => {
        const app = new Elysia()
            .use(elysiaJhx())
            // @ts-expect-error 'JhxComponent' decoration is not type-safe.
            .get('/', ({ JhxComponent }) => {
                const html = renderToStaticMarkup(
                    <JhxComponent
                        as='span'
                        route={route}
                        handler={() => 'handler-return'}
                    >
                        ok
                    </JhxComponent>
                );

                return new Response(html, {
                    headers: { 'content-type': 'text/html' },
                });
            });

        const rootRes = await app.fetch(new Request(`http://localhost/`));
        await expectResponse(rootRes, '<span hx-get="/_jhx/test">ok</span>');

        const routeRes = await app.fetch(testReq());
        await expectResponse(routeRes, 'handler-return', 'text/html');
    });
});
