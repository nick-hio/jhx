import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxTimeoutEventProperties = 'elt' | 'requestConfig' | 'target' | 'xhr';

export interface HtmxTimeoutEvent extends HtmxDomEvent {
    detail: Detail<HtmxTimeoutEventProperties>;
    type: 'htmx:timeout';
}
