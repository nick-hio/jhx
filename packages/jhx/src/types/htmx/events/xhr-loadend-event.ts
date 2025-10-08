import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxXhrLoadendEventProperties = 'elt' | 'lengthComputable' | 'loaded' | 'total';

export interface HtmxXhrLoadendEvent extends HtmxDomEvent {
    detail: Detail<HtmxXhrLoadendEventProperties>;
    type: 'htmx:xhr:loadend';
}
