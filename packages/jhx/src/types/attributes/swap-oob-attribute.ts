import type { HtmxSwapStyle } from '../htmx';

export type JhxSwapOobAttribute =
    | {
          swap: HtmxSwapStyle;
          selector?: string;
      }
    | HtmxSwapStyle
    | boolean
    | (string & {});
