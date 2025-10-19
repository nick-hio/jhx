import { Stream } from 'node:stream';
import type { Context as ElysiaContext } from 'elysia';
import { ElysiaFile } from 'elysia';

const isArrayBuffer = (value: unknown): value is ArrayBuffer => {
    return (
        value instanceof Uint8Array
        || value instanceof Uint16Array
        || value instanceof Uint32Array
        || value instanceof Uint8ClampedArray
        || value instanceof BigUint64Array
        || (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView(value as any))
        || (typeof Buffer !== 'undefined' && value instanceof Buffer)
    );
};

const capitalize = (key: string) => {
    return key
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('-');
};

const ensureHeader = (context: ElysiaContext, key: string, value: string) => {
    if (!context.set.headers[capitalize(key)] && !context.set.headers[key.toLowerCase()]) {
        context.set.headers[key.toLowerCase()] = value;
    }
};

export const sendPayload = (context: ElysiaContext, payload: unknown) => {
    if (payload instanceof Response) {
        return payload as Response;
    }

    if (payload instanceof Blob) {
        if (payload.type) {
            ensureHeader(context, 'content-type', payload.type);
        }
        if (payload.size >= 0) {
            ensureHeader(context, 'content-length', String(payload.size));
        }
        return payload;
    }

    if (payload instanceof ElysiaFile) {
        if (payload.type) {
            ensureHeader(context, 'content-type', payload.type);
        }
        if (!(payload.length instanceof Promise)) {
            ensureHeader(context, 'content-length', String(payload.length));
        }
        return payload as any;
    }

    if (payload instanceof FormData) {
        ensureHeader(context, 'content-type', 'multipart/form-data');
        return new Response(payload as any);
    }

    if (payload instanceof ReadableStream || payload instanceof Stream || isArrayBuffer(payload)) {
        ensureHeader(context, 'content-type', 'application/octet-stream');
        return new Response(payload as any);
    }

    if (typeof payload === 'object') {
        ensureHeader(context, 'content-type', 'application/json');
    }

    return payload as any;
};
