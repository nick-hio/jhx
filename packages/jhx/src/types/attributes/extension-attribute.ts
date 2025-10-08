import type { DefaultHtmxExtension } from '../../lib/htmx';

export type JhxExtensionAttribute =
    | (
          | string
          | {
                name: DefaultHtmxExtension | (string & {});
                /** Defaults to `false`. */
                ignore?: boolean;
            }
      )[]
    | string;
