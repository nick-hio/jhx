import type { HtmxSwapStyle } from '../htmx';

export type JhxSelectOobAttribute =
    | Array<string | { selector: string; swap?: HtmxSwapStyle }>
    | { selector: string; swap?: HtmxSwapStyle }
    | string;
