import type { Context as ElysiaContext } from 'elysia';

const ensureHeader = (context: ElysiaContext, key: string, value: string) => {
    const headers = context.set.headers as Record<string, string>;
    if (!headers[key]) headers[key] = value;
};

export const sendPayload = (context: ElysiaContext, payload: unknown, status: number = 200) => {
    if (payload instanceof Response) return payload;

    let body = '';

    if (
        payload instanceof ArrayBuffer
        || payload instanceof Uint8Array
        || (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView(payload as any))
    ) {
        body = payload as any;
        ensureHeader(context, 'content-type', 'application/octet-stream');
    } else if (typeof payload === 'object') {
        body = JSON.stringify(payload);
        ensureHeader(context, 'content-type', 'application/json; charset=utf-8');
    } else if (payload !== undefined && payload !== null) {
        body = String(payload);
    }

    return new Response(body, {
        status,
        headers: {
            ...(context.set.headers as Record<string, string>),
        },
    });
};
