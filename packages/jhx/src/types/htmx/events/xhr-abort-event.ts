import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxXhrAbortEventProperties = 'elt' | 'lengthComputable' | 'loaded' | 'total';

export interface HtmxXhrAbortEvent extends HtmxDomEvent {
    detail: Detail<HtmxXhrAbortEventProperties>;
    type: 'htmx:xhr:abort';
}
