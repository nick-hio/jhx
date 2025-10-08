import { describe, expect, it } from 'bun:test';
import { buildServer } from "./build-server";

describe('[jhx-fastify] initialization', async () => {
    it('pre-registered route (GET)', async () => {
        const fastify = await buildServer({
            routes: {
                route: '/pre-reg',
                handler: (_req, res) => res.send('ok'),
            },
        });

        const res = await fastify.inject({ method: 'GET', url: '/_jhx/pre-reg' });
        expect(res.body).toBe('ok');
        expect(res.statusCode).toBe(200);
    });

    it('pre-registered route (POST)', async () => {
        const fastify = await buildServer({
            routes: {
                method: 'POST',
                route: '/pre-reg',
                handler: (_req, res) => res.send('ok'),
            },
        });

        const res = await fastify.inject({ method: 'POST', url: '/_jhx/pre-reg' });
        expect(res.body).toBe('ok');
        expect(res.statusCode).toBe(200);
    });

    it('pre-registered routes (GET & POST)', async () => {
        const fastify = await buildServer({
            routes: [
                {
                    method: 'get',
                    route: '/pre-reg-get',
                    handler: (_req, res) => res.send('ok'),
                },
                {
                    method: 'POST',
                    route: '/pre-reg-post',
                    handler: (_req, res) => res.send('ok'),
                }
            ],
        });

        const getRes = await fastify.inject({ method: 'GET', url: '/_jhx/pre-reg-get' });
        expect(getRes.body).toBe('ok');
        expect(getRes.statusCode).toBe(200);

        const postRes = await fastify.inject({ method: 'POST', url: '/_jhx/pre-reg-post' });
        expect(postRes.body).toBe('ok');
        expect(postRes.statusCode).toBe(200);
    });

    it('pre-registered routes cannot use same route', async () => {
        expect(async () => await buildServer({
            routes: [
                {
                    route: '/test',
                    handler: () => 'handler-one',
                },
                {
                    route: '/test',
                    handler: () => 'handler-two',
                }
            ],
        })).toThrow(Error);
    });
});
