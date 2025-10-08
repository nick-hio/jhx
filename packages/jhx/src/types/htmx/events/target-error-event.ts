import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxTargetErrorEventProperties = 'elt' | 'error' | 'target';

export interface HtmxTargetErrorEvent extends HtmxDomEvent {
    detail: Detail<HtmxTargetErrorEventProperties>;
    type: 'htmx:targetError';
}
