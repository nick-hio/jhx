import { afterAll, describe, expect, it } from 'bun:test';
import Fastify from 'fastify';

import { createJhx } from '../src';

const expectRecord = (v: Record<string, string>) => v;
const expectString = (v: string) => v;

describe('[jhx-fastify] config.stringify (default)', async () => {
    const fastify = Fastify();
    const { jhx } = createJhx(fastify);
    await fastify.listen({ port: 20001, host: '127.0.0.1' });

    afterAll(async () => await fastify.close());

    it('to default', () => {
        const result = jhx({ route: '/api/example' });
        expectRecord(result);
        expect(typeof result).toBe('object');
    });

    it('to true', () => {
        const result = jhx({ route: '/api/example' }, { stringify: true });
        expectString(result);
        expect(typeof result).toBe('string');
    });

    it('to false', () => {
        const result = jhx({ route: '/api/example' }, { stringify: false });
        expectRecord(result);
        expect(typeof result).toBe('object');
    });
});

describe('[jhx-fastify] config.stringify (true)', async () => {
    const fastify = Fastify();
    const { jhx } = createJhx(fastify, {
        stringify: true,
    });
    await fastify.listen({ port: 20002, host: '127.0.0.1' });

    afterAll(async () => await fastify.close());

    it('to default', () => {
        const result = jhx({ route: '/api/example' });
        expectString(result);
        expect(typeof result).toBe('string');
    });

    it('to true', () => {
        const result = jhx({ route: '/api/example' }, { stringify: true });
        expectString(result);
        expect(typeof result).toBe('string');
    });

    it('to false', () => {
        const result = jhx({ route: '/api/example' }, { stringify: false });
        expectRecord(result);
        expect(typeof result).toBe('object');
    });
});

describe('[jhx-fastify] config.stringify (false)', async () => {
    const fastify = Fastify();
    const { jhx } = createJhx(fastify, {
        stringify: false,
    });
    await fastify.listen({ port: 20003, host: '127.0.0.1' });

    afterAll(async () => await fastify.close());

    it('to default', () => {
        const result = jhx({ route: '/api/example' });
        expectRecord(result);
        expect(typeof result).toBe('object');
    });

    it('to true', () => {
        const result = jhx({ route: '/api/example' }, { stringify: true });
        expectString(result);
        expect(typeof result).toBe('string');
    });

    it('to false', () => {
        const result = jhx({ route: '/api/example' }, { stringify: false });
        expectRecord(result);
        expect(typeof result).toBe('object');
    });
});
