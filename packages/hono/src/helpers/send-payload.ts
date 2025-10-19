import { Stream } from 'node:stream';
import type { Context as HonoContext } from 'hono';

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

const ensureHeader = (context: HonoContext, key: string, value: string) => {
    if (!context.res.headers.get(capitalize(key)) && !context.res.headers.get(key.toLowerCase())) {
        context.res.headers.set(key.toLowerCase(), value);
    }
};

export const sendPayload = (context: HonoContext, payload: unknown) => {
    if (payload instanceof Response) {
        return payload as Response;
    }

    if (payload instanceof Blob) {
        ensureHeader(context, 'content-type', payload.type);
        ensureHeader(context, 'content-length', String(payload.size));
        return context.body(payload as any);
    }

    if (payload instanceof FormData) {
        ensureHeader(context, 'content-type', 'multipart/form-data');
        return new Response(payload as any);
    }

    if (payload instanceof ReadableStream || payload instanceof Stream || isArrayBuffer(payload)) {
        ensureHeader(context, 'content-type', 'application/octet-stream');
        return context.body(payload as any);
    }

    if (typeof payload === 'object') {
        ensureHeader(context, 'content-type', 'application/json');
        return context.json(payload);
    }

    return context.body(payload as any);
};
