import { Stream } from 'node:stream';
import type { FastifyReply } from 'fastify';

export const isFastifyReply = (value: unknown): value is FastifyReply => {
    return (
        !!value
        && typeof value === 'object'
        && typeof (value as any).send === 'function'
        && ('raw' in value || 'res' in value)
        && 'request' in value
        && 'sent' in value
    );
};

export const isReplySent = (res: any) => {
    return (
        !!res
        && (res.sent
            || (res.raw && (res.raw.headersSent || res.raw.writableEnded))
            || res.headersSent === true)
    );
};

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

const ensureHeader = (res: FastifyReply, header: string, value: string) => {
    const capitalized = capitalize(header);
    if (!res.getHeader(capitalized) && !res.getHeader(header.toLowerCase())) {
        res.header(capitalized, value);
    }
};

export const sendPayload = async (res: FastifyReply, payload: unknown) => {
    if (isFastifyReply(payload) || isReplySent(res)) {
        return res;
    }

    if (payload instanceof Blob) {
        if (payload.type) {
            ensureHeader(res, 'Content-Type', payload.type);
        }
        if (payload.size >= 0) {
            ensureHeader(res, 'Content-Length', String(payload.size));
        }
        const buffer = await payload.arrayBuffer();
        return res.send(Buffer.from(buffer));
    }

    if (payload instanceof FormData) {
        ensureHeader(res, 'Content-Type', 'multipart/form-data');
    } else if (
        payload instanceof Response
        || payload instanceof ReadableStream
        || payload instanceof Stream
        || isArrayBuffer(payload)
    ) {
        ensureHeader(res, 'Content-Type', 'application/octet-stream');
    } else if (typeof payload === 'object' && payload !== null) {
        ensureHeader(res, 'Content-Type', 'application/json');
    }

    return res.send(payload);
};
