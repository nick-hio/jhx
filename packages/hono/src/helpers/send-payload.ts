import type { Context as HonoContext } from 'hono';

import { isResponseHandled } from './is-response-handled';

export const sendPayload = (context: HonoContext, payload: unknown) => {
    if (isResponseHandled(context, payload)) {
        return payload instanceof Response ? payload : context.res;
    }
    if (payload instanceof Response) {
        return payload;
    }
    if (payload === undefined || payload === null) {
        return context.body(null);
    }
    if (typeof payload === 'object') {
        return context.json(payload);
    }
    if (ArrayBuffer.isView(payload) || payload instanceof ArrayBuffer || payload instanceof Buffer) {
        const view =
            payload instanceof ArrayBuffer
                ? new Uint8Array(payload)
                : new Uint8Array(payload.buffer, payload.byteOffset, payload.byteLength);
        return context.body(view);
    }

    return context.body(String(payload));
};
