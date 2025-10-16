import type { Context as HonoContext } from 'hono';
import { Stream } from "node:stream";

const isArrayBuffer = (value: unknown): value is ArrayBuffer => {
    return value instanceof Uint8Array
    || value instanceof Uint16Array
    || value instanceof Uint32Array
    || value instanceof Uint8ClampedArray
    || value instanceof BigUint64Array
    || (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView(value as any))
    || (typeof Buffer !== 'undefined' && value instanceof Buffer)
}

const isHonoContext = (value: unknown): value is HonoContext => {
    return !!value
        && typeof value === 'object'
        && 'finalized' in value
        && 'render' in value
        && 'body' in value
        && 'text' in value
        && 'json' in value
        && 'html' in value;
};

export const sendPayload = (context: HonoContext, payload: unknown, status: number = 200) => {
    if (payload instanceof Response) {
        return payload as Response;
    }

    if (payload instanceof Blob) {
        if (!context.res.headers.get('Content-Type') && !context.res.headers.get('content-type')) {
            context.res.headers.set('content-type', payload.type);
        }
        if (!context.res.headers.get('Content-Length') && !context.res.headers.get('content-length')) {
            context.res.headers.set('content-length', String(payload.size));
        }
        return context.body(payload as any);
    }

    if (payload instanceof ReadableStream || payload instanceof Stream || isArrayBuffer(payload)) {
        if (!context.res.headers.get('Content-Type') && !context.res.headers.get('content-type')) {
            context.res.headers.set('content-type', 'application/octet-stream');
        }
        return context.body(payload as any);
    }

    if (isHonoContext(payload)) {
        return new Response(context.res.body, {
            ...context.res,
            status: 500,
            headers: {
                ...Object.fromEntries(context.res.headers.entries()),
            },
        });
    }

    if (typeof payload === 'object') {
        return context.json(payload);
    }

    return context.body(payload as any);
};
