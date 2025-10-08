import type { HtmxSwapStyle } from '../../lib/htmx';

export type JhxSelectOobAttribute =
    | (
          | string
          | {
                selector: string;
                swap?: HtmxSwapStyle;
            }
      )[]
    | string;
