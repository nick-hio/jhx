import type { JhxConfig } from '../types';

export type JhxDefaultConfig = Required<JhxConfig>;

/**
 * Default jhx configuration
 */
export const defaultConfig: JhxDefaultConfig = {
    logger: console,
    stringify: false,
    escape: true,
} as const;
