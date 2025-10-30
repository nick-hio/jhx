import { describe, it } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';

import { buildServer, expectResponse, ENDPOINT } from './helpers';

const route = ENDPOINT;
const url = `/_jhx${route}`;

describe('instance', async () => {
    it('component exists', async () => {
        const fastify = await buildServer();

        fastify.route({
            method: 'GET',
            url: '/',
            handler: async (_req, res) => {
                const html = renderToStaticMarkup(
                    <fastify.JhxComponent
                        as='span'
                        route={route}
                        handler={() => 'handler-return'}
                    >
                        ok
                    </fastify.JhxComponent>
                );
                return res.type('text/html').send(html);
            },
        });

        const rootRes = await fastify.inject({ method: 'GET', url: '/' });
        expectResponse(rootRes, '<span hx-get="/_jhx/test">ok</span>', 'text/html');

        const routeRes = await fastify.inject({ method: 'GET', url });
        expectResponse(routeRes, 'handler-return', 'text/html');
    });
});
