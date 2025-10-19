import { Stream } from 'node:stream';
import type { Response as ExpressResponse } from 'express';

export const isExpressResponse = (value: any): value is ExpressResponse => {
    return (
        value !== null
        && typeof value === 'object'
        && typeof value.send === 'function'
        && typeof value.status === 'function'
        && typeof value.json === 'function'
        && 'headersSent' in value
    );
};

export const isResponseSent = (r: any) => {
    return !!(r && (r.headersSent === true || r.finished === true || r.writableEnded === true));
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

const ensureHeader = (res: ExpressResponse, header: string, value: string) => {
    const capitalized = capitalize(header);
    if (!res.getHeader(capitalized) && !res.getHeader(header.toLowerCase())) {
        res.header(capitalized, value);
    }
};

export const sendPayload = async (res: ExpressResponse, payload: any) => {
    if (isExpressResponse(payload) || isResponseSent(res)) {
        return;
    }

    if (payload instanceof Blob) {
        if (payload.type) {
            ensureHeader(res, 'Content-Type', payload.type);
        }
        if (payload.size >= 0) {
            ensureHeader(res, 'Content-Length', String(payload.size));
        }
        const buffer = await payload.arrayBuffer();
        res.send(Buffer.from(buffer));
        return;
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

    res.send(payload);
};
