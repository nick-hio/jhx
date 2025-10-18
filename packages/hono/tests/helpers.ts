import type { CreateJhxConfig } from '../src';
import { createJhx } from '../src';
import { Hono } from 'hono';
import { expect } from 'bun:test';

export const buildServer = (jhxConfig: CreateJhxConfig = {}) => {
    const app = new Hono();
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
        expect(res.headers.get('Content-Type')).toBe(contentType);
        expect(res.headers.get('content-type')).toBe(contentType);
    }

    expect(res.status).toBe(status);
}

export const ENDPOINT = '/test';
export const testReq = (endpoint?: string) => `/_jhx${endpoint ?? ENDPOINT}`;
