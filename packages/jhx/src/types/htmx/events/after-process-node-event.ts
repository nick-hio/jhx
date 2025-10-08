import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxAfterProcessNodeEventProperties = 'elt';

export interface HtmxAfterProcessNodeEvent extends HtmxDomEvent {
    detail: Detail<HtmxAfterProcessNodeEventProperties>;
    type: 'htmx:afterProcessNode';
}
