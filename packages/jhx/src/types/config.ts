import type { Logger } from './logger.ts';

export interface JhxConfig {
    logger?: Logger;

    stringify?: boolean;

    escape?: boolean;
}
