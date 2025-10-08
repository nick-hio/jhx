import type { Logger } from './logger.ts';

export interface JhxConfig {
    logger?: Logger;

    /**
     * If set to `true`, the return value will be a string which can be inserted into an HTML elements attributes;
     * otherwise, the return value will be an object map.
     */
    stringify?: boolean;
}
