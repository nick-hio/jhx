import Fastify from 'fastify';

import type { CreateJhxConfig } from '../src';
import { fastifyJhx } from '../src';
import { expect } from 'bun:test';
import http from 'node:http';
import type { Readable } from 'node:stream';

export const buildServer = async (
    jhxConfig: CreateJhxConfig = {},
) => {
    const fastify = Fastify();
    await fastify.register(fastifyJhx, jhxConfig);

    fastify.ready((e) => {
        if (e) {
            console.error('FASTIFY ERROR');
            console.error(JSON.stringify(e, null, 2));
            throw e;
        }
    });

    return fastify;
};

type FastifyInjectResponse = {
    raw: {
        res: http.ServerResponse,
        req: http.IncomingMessage
    }
    rawPayload: Buffer
    headers: http.OutgoingHttpHeaders
    statusCode: number
    statusMessage: string
    trailers: { [key: string]: string }
    payload: string
    body: string
    json: <T = any>() => T
    stream: () => Readable
    cookies: Array<{
        name: string
        value: string
        expires?: Date
        maxAge?: number
        secure?: boolean
        httpOnly?: boolean
        sameSite?: string
        [p: string]: unknown
    }>
}

export const expectResponse = (
    res: FastifyInjectResponse,
    expectedBody: string | object,
    contentType?: string | null,
    status = 200
) => {
    if (typeof expectedBody === 'object') {
        expect(res.json<object>()).toEqual(expectedBody);
    } else {
        expect(res.body).toBe(expectedBody);
    }
    if (contentType || contentType === null) {
        const capitalizedContentType = res.headers['Content-Type'];
        const lowercasedContentType = res.headers['content-type'];
        expect(!(capitalizedContentType && lowercasedContentType)).toBe(true);
        expect(capitalizedContentType ?? lowercasedContentType).toBe(contentType ?? undefined);
    }
    expect(res.statusCode).toBe(status);
}

export const ENDPOINT = '/test';
// export const testReq = (init: RequestInit = {}) => new Request(`http://localhost/_jhx${ENDPOINT}`, { method: 'GET', ...init });
