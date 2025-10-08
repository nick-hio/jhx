import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxXhrProgressEventProperties = 'elt' | 'lengthComputable' | 'loaded' | 'total';

export interface HtmxXhrProgressEvent extends HtmxDomEvent {
    detail: Detail<HtmxXhrProgressEventProperties>;
    type: 'htmx:xhr:progress';
}
