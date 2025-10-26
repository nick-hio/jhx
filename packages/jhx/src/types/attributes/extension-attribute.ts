import type { HtmxDefaultExtension } from '../htmx';

export type JhxExtensionAttribute =
    | Array<
          | string
          | {
                /** The name of the HTMX extension. */
                name: HtmxDefaultExtension | (string & {});
                /** Whether the extension will be ignored for the element (defaults to `false`). */
                ignore?: boolean;
            }
      >
    | {
          /** The name of the HTMX extension. */
          name: HtmxDefaultExtension | (string & {});
          /** Whether the extension will be ignored for the element (defaults to `false`). */
          ignore?: boolean;
      }
    | HtmxDefaultExtension
    | (string & {});
