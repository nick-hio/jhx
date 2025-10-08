import type { HtmxStrategy } from '../../lib/htmx';

export type JhxSyncAttribute =
    | {
          strategy: HtmxStrategy;
          tag: string;
          closest?: boolean;
      }
    | {
          strategy: HtmxStrategy;
          tag?: never;
          closest?: never;
      }
    | string;
