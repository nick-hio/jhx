import type { HtmxSyncStrategy } from '../htmx';

export type JhxSyncAttribute =
    | {
          strategy: HtmxSyncStrategy;
          tag: string;
          closest?: boolean;
      }
    | {
          strategy: HtmxSyncStrategy;
          tag?: never;
          closest?: never;
      }
    | string;
