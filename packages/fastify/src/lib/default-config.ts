import { serverDefaultConfig } from '@jhxdev/server';

import type { JhxHandler, JhxRenderHandler } from '../types';

export type JhxDefaultConfig = Omit<typeof serverDefaultConfig, 'render'> & {
    notFoundHandler: JhxHandler;
    render: JhxRenderHandler;
};

export const defaultConfig: JhxDefaultConfig = {
    ...serverDefaultConfig,
    notFoundHandler: (_req, res) => res.code(404).send(),
} as const;
