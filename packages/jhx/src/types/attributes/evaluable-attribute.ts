import type { DomObjects } from '../dom-objects.ts';

/**
 * - If the value is an `object` or `string`, it is evaluated server-side at render time.
 * - If the value is a `function`, it is evaluated client-side when triggered.
 * @template TDom Type for additional parameters received from the DOM.
 */
export type JhxEvaluableAttribute<TBaseDom extends object = object> =
    | (<TDom extends TBaseDom | object = object>(dom: DomObjects & TDom) => Record<string, any> | object)
    | Record<string, any>
    | object
    | string;
