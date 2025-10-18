import type { CreateJhxConfig } from '../src';
import { createJhx } from '../src';
import { Elysia } from 'elysia';
import { expect } from 'bun:test';

export const buildServer = (jhxConfig: CreateJhxConfig = {}) => {
    const app = new Elysia();
    const { jhx, JhxComponent } = createJhx(app, jhxConfig);

    return { app, jhx, JhxComponent }
};

export const expectResponse = async (
    res: Response,
    expectedBody: string | object,
    contentType?: string | null,
    status = 200
) => {
    if (typeof expectedBody === 'object') {
        expect(await res.json() as object).toEqual(expectedBody);
    } else {
        expect(await res.text()).toBe(expectedBody);
    }
    if (contentType || contentType === null) {
        expect(res.headers.get('content-type')).toBe(contentType);
    }
    expect(res.status).toBe(status);
}

export const ENDPOINT = '/test';
export const testReq = (init: RequestInit = {}) => new Request(`http://localhost/_jhx${ENDPOINT}`, { method: 'GET', ...init });
