import type { Context as ElysiaContext } from 'elysia';

import type { JhxRenderReturn } from '../types';

export const sendPayload = (_context: ElysiaContext, payload: unknown) => {
    return payload as JhxRenderReturn;
};
