import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxXhrLoadstartEventProperties = 'elt' | 'lengthComputable' | 'loaded' | 'total';

export interface HtmxXhrLoadstartEvent extends HtmxDomEvent {
    detail: Detail<HtmxXhrLoadstartEventProperties>;
    type: 'htmx:xhr:loadstart';
}
