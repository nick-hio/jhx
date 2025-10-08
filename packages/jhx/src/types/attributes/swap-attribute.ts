import type { HtmxSwapStyle } from '../../lib/htmx';
import type { Duration } from '../duration.ts';

export type JhxSwapScroll =
    | 'top'
    | 'bottom'
    | { selector: string; position: 'top' | 'bottom' }
    | { window: true; position: 'top' | 'bottom' };

export type JhxSwapShow =
    | 'top'
    | 'bottom'
    | 'none'
    | { selector: string; position: 'top' | 'bottom' }
    | { window: true; position: 'top' | 'bottom' };

export type JhxSwapAttribute =
    | (HtmxSwapStyle | (string & {}))
    | {
          /** The swap style. */
          style?: HtmxSwapStyle | (string & {});
          /** The duration of time that htmx will wait to swap the content after receiving a response. */
          swap?: Duration;
          /** The duration of time that htmx will wait to settle after swapping. */
          settle?: Duration;
          /**
           * Whether the [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) will be used.
           */
          transition?: boolean;
          /**
           * Specifies the scrolling behavior after the swap.
           * Can be `'top'`, `'bottom'`, or an object specifying a selector and position.
           */
          scroll?: JhxSwapScroll;
          /**
           * Specifies which element to show in the viewport after the swap.
           * Can be `'top'`, `'bottom'`, `'none'`, or an object specifying a selector and position.
           */
          show?: JhxSwapShow;
          /**
           * Whether htmx will update the page title when the response contains a `<title>` element.
           * Defaults to `false`.
           */
          ignoreTitle?: boolean;
          /**
           * Whether the `<input>` focus is maintained between requests. The `<input>` element must have an `id` attribute.
           *
           * Defaults to `false`.
           */
          focusScroll?: boolean;
      };
