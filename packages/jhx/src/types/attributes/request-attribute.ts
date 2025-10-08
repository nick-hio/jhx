import type { DomObjects } from '../dom-objects.ts';

export interface JhxRequestArgs {
    timeout?: number;
    credentials?: boolean;
    noHeaders?: boolean;
}

/**
 * - If the value is an `object` or `string`, it is evaluated server-side at render time.
 * - If the value is a `function`, it is evaluated client-side when triggered.
 */
export type JhxRequestAttribute<
    /** Type for additional parameters received from the DOM. */
    TDom extends object = object,
> = ((dom: DomObjects & TDom) => JhxRequestArgs) | JhxRequestArgs | string;
