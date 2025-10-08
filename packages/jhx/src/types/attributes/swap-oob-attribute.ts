import type { HtmxSwapStyle } from '../../lib/htmx';

export type JhxSwapOobAttribute =
    | {
          swap: HtmxSwapStyle;
          selector?: string;
      }
    | HtmxSwapStyle
    | boolean
    | (string & {});
