import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxBeforeProcessNodeEventProperties = 'elt';

export interface HtmxBeforeProcessNodeEvent extends HtmxDomEvent {
    detail: Detail<HtmxBeforeProcessNodeEventProperties>;
    type: 'htmx:beforeProcessNode';
}
