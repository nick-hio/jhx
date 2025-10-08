import type { ConditionalFunction as ConditionalFunctionType } from 'htmx.org';

import type { Duration } from '../duration.ts';
import type { JhxTargetAttribute } from './target-attribute';

export type JhxTriggerQueue = 'first' | 'last' | 'all' | 'none';

export type JhxTriggerFrom =
    | {
          selector: string;
          op?: 'closest' | 'next' | 'previous' | 'find';
      }
    | {
          selector?: never;
          op: 'this' | 'document' | 'window';
      }
    | string;

export type ConditionalFunction = ConditionalFunctionType;

interface JhxTriggerModifier {
    changed?: boolean;
    consume?: boolean;
    delay?: Duration;
    event?: string;
    filter?: ConditionalFunction | string;
    from?: JhxTriggerFrom;
    once?: boolean;
    queue?: JhxTriggerQueue;
    target?: JhxTargetAttribute;
    throttle?: Duration;
}

export interface JhxTriggerAttribute_Standard extends JhxTriggerModifier {
    trigger: 'load' | 'revealed' | (string & {});
}

export interface JhxTriggerAttribute_Intersect extends JhxTriggerModifier {
    trigger: 'intersect';
    root?: string;
    threshold?: number;
}

export interface JhxTriggerAttribute_Poll extends JhxTriggerModifier {
    poll: Duration;
    trigger?: never;
}

export type JhxTriggerAttribute =
    | JhxTriggerAttribute_Standard
    | JhxTriggerAttribute_Intersect
    | JhxTriggerAttribute_Poll
    | (JhxTriggerAttribute_Standard | JhxTriggerAttribute_Intersect | JhxTriggerAttribute_Poll | string)[]
    | string;
