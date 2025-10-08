import type { HtmxAttribute, HtmxAttributeKey } from '../../lib/htmx';

export type JhxInheritAttribute =
    | HtmxAttribute
    | HtmxAttributeKey
    | (HtmxAttribute | HtmxAttributeKey)[]
    | '*'
    | (string & {});
