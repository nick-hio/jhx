import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxOnLoadErrorEventProperties =
    | 'elt'
    | 'error'
    | 'exception'
    | 'pathInfo'
    | 'requestConfig'
    | 'target'
    | 'xhr';

export interface HtmxOnLoadErrorEvent extends HtmxDomEvent {
    detail: Detail<HtmxOnLoadErrorEventProperties>;
    type: 'htmx:onLoadError';
}
