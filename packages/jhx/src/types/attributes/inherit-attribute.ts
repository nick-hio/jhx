import type { HtmxAttribute } from '../htmx';

export type JhxInheritAttribute = Array<HtmxAttribute | (string & {})> | HtmxAttribute | '*' | (string & {});
