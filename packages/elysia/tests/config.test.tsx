import { expect, describe, it } from 'bun:test';

import { buildServer, expectResponse, req, ENDPOINT } from './helpers';
import { createJhx } from '../src';

const expectRecord = (v: Record<string, string>) => v; // compile-time check
const expectString = (v: string) => v; // compile-time check

const route = ENDPOINT;

describe('config.stringify Tests', async () => {
    const { app } = buildServer();
    const { jhx: jhxDefault } = createJhx(app, {
        prefix: '/stringify-default-test',
    });

    it('default, no change', async () => {
        const result = jhxDefault({ route });
        expectRecord(result);
        expect(typeof result).toBe('object');
    });

    it('default to true', async () => {
        const result = jhxDefault({ route }, { stringify: true });
        expectString(result);
        expect(typeof result).toBe('string');
    });

    it('default to false', async () => {
        const result = jhxDefault({ route }, { stringify: false });
        expectRecord(result);
        expect(typeof result).toBe('object');
    });

    const { jhx: jhxTrue } = createJhx(app, {
        prefix: '/stringify-true-test',
        stringify: true,
    });

    it('true, no change', async () => {
        const result = jhxTrue({ route });
        expectString(result);
        expect(typeof result).toBe('string');
    });

    it('true to false', async () => {
        const result = jhxTrue({ route }, { stringify: false });
        expectRecord(result);
        expect(typeof result).toBe('object');
    });

    const { jhx: jhxFalse } = createJhx(app, {
        prefix: '/stringify-false-test',
        stringify: false,
    });

    it('false, no change ', async () => {
        const result = jhxFalse({ route });
        expectRecord(result);
        expect(typeof result).toBe('object');
    });

    it('false to true', async () => {
        const result = jhxFalse({ route }, { stringify: true });
        expectString(result);
        expect(typeof result).toBe('string');
    });
});

describe('config.routes Tests', async () => {
    it('GET route', async () => {
        const { app } = buildServer({
            routes: { route, handler: () => 'ok' },
        });

        const res = await app.fetch(req());
        await expectResponse(res, 'ok', 'text/html');
    });

    it('POST route', async () => {
        const { app } = buildServer({
            routes: { route, handler: () => 'ok', method: 'POST' },
        });

        const res = await app.fetch(req({ method: 'POST' }));
        await expectResponse(res, 'ok', 'text/html');
    });

    it('GET & POST routes', async () => {
        const { app } = buildServer({
            routes: [
                { route, handler: () => 'ok' },
                { route, handler: () => 'ok', method: 'POST' },
            ],
        });

        const getRes = await app.fetch(req());
        await expectResponse(getRes, 'ok', 'text/html');

        const postRes = await app.fetch(req({ method: 'POST' }));
        await expectResponse(postRes, 'ok', 'text/html');
    });

    it('routes cannot use same endpoint', async () => {
        expect(
            async () => {
                buildServer({
                    routes: [
                        { route, handler: () => 'handler-one' },
                        { route, handler: () => 'handler-two' },
                    ],
                });
            }
        ).toThrow(Error);
    });
});
