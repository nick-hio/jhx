import { describe, expect, it } from 'bun:test';
import { buildServer } from './build-server';
import { createJhx } from '../src';

const expectRecord = (v: Record<string, string>) => v; // Compile-time check
const expectString = (v: string) => v; // Compile-time check

describe('[fastify] config.stringify Tests', async () => {
    const fastifyDefault = await buildServer();
    const { jhx: jhxDefault } = createJhx(fastifyDefault, {
        prefix: '/stringify-default-test',
    });

    it('default, no change', async () => {
        const result = jhxDefault({ route: '/test' });
        expectRecord(result);
        expect(typeof result).toBe('object');
    });

    it('default to true', async () => {
        const result = jhxDefault({ route: '/test' }, { stringify: true });
        expectString(result);
        expect(typeof result).toBe('string');
    });

    it('default to false', async () => {
        const result = jhxDefault({ route: '/test' }, { stringify: false });
        expectRecord(result);
        expect(typeof result).toBe('object');
    });

    const fastifyTrue = await buildServer();
    const { jhx: jhxTrue } = createJhx(fastifyTrue, {
        prefix: '/stringify-true-test',
        stringify: true,
    });

    it('true, no change', async () => {
        const result = jhxTrue({ route: '/test' });
        expectString(result);
        expect(typeof result).toBe('string');
    });

    it('true to false', async () => {
        const result = jhxTrue({ route: '/test' }, { stringify: false });
        expectRecord(result);
        expect(typeof result).toBe('object');
    });

    const fastifyFalse = await buildServer();
    const { jhx: jhxFalse } = createJhx(fastifyFalse, {
        prefix: '/stringify-false-test',
        stringify: false,
    });

    it('false, no change ', async () => {
        const result = jhxFalse({ route: '/test' });
        expectRecord(result);
        expect(typeof result).toBe('object');
    });

    it('false to true', async () => {
        const result = jhxFalse({ route: '/test' }, { stringify: true });
        expectString(result);
        expect(typeof result).toBe('string');
    });
});

describe('[fastify] config.routes Tests', async () => {
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
                },
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
        expect(
            async () =>
                await buildServer({
                    routes: [
                        {
                            route: '/test',
                            handler: () => 'handler-one',
                        },
                        {
                            route: '/test',
                            handler: () => 'handler-two',
                        },
                    ],
                }),
        ).toThrow(Error);
    });
});
