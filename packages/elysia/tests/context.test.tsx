import { describe, it } from 'bun:test';
import { Elysia } from 'elysia';
import { renderToStaticMarkup } from 'react-dom/server';

import { expectResponse, req, ENDPOINT } from './helpers';
import { elysiaJhx } from '../src';

const route = ENDPOINT;

describe('elysia context', async () => {
    it('function exists', async () => {
        const app = new Elysia()
            .use(elysiaJhx())
            // @ts-expect-error 'jhx' decoration is not type-safe.
            .get('/', ({ jhx }) => {
                jhx({ route, handler: () => 'handler-one-return' });
                jhx({ route: '/new-endpoint', handler: () => 'handler-two-return' });

                return new Response('ok');
            });

        const rootRes = await app.fetch(new Request(`http://localhost/`));
        await expectResponse(rootRes, 'ok');

        const routeOneRes = await app.fetch(req());
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

        const routeRes = await app.fetch(req());
        await expectResponse(routeRes, 'handler-return', 'text/html');
    });
});
