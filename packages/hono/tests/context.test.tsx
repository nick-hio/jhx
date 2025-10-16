import { describe, it } from 'bun:test';

import { buildServer, expectResponse, testReq, ENDPOINT } from './helpers';

const route = ENDPOINT;

describe('elysia context', async () => {
    it('c.status changes response', async () => {
        const { app, jhx } = buildServer();

        jhx({
            route,
            handler: (c) => {
                c.status(201)
                return c.text('ok');
            }
        });

        const res = await app.request(testReq());
        await expectResponse(res, 'ok', 'text/plain; charset=UTF-8', 201);
    });

    it('c.header changes response', async () => {
        const { app, jhx } = buildServer();

        jhx({
            route,
            handler: (c) => {
                c.header('content-type', 'text/plain');
                return 'ok';
            }
        });

        const res = await app.request(testReq());
        await expectResponse(res, 'ok', 'text/plain');
    });

    it('c.text; handler', async () => {
        const { app, jhx } = buildServer();

        jhx({
            route,
            handler: (c) => c.text('ok'),
        });

        const res = await app.request(testReq());
        await expectResponse(res, 'ok', 'text/plain; charset=UTF-8');
    });

    it('c.text; not found handler', async () => {
        const { app } = buildServer({
            notFoundHandler: (c) => c.text('not found'),
        });

        const res = await app.request(testReq());
        await expectResponse(res, 'not found', 'text/plain; charset=UTF-8', 404);
    });

    it('c.text; error handler', async () => {
        const { app, jhx } = buildServer({
            errorHandler: (err, c) => c.text(err.message),
        });

        jhx({
            route,
            handler: () => {
                throw new Error('route-error');
            }
        });

        const res = await app.request(testReq());
        await expectResponse(res, 'route-error', 'text/plain; charset=UTF-8', 500);
    });
});
