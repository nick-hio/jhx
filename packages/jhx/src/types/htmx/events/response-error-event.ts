import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxResponseErrorEventProperties =
    | 'boosted'
    | 'elt'
    | 'error'
    | 'etc'
    | 'failed'
    | 'pathInfo'
    | 'requestConfig'
    | 'select'
    | 'successful'
    | 'target'
    | 'xhr';

export interface HtmxResponseErrorEvent extends HtmxDomEvent {
    detail: Detail<HtmxResponseErrorEventProperties>;
    type: 'htmx:responseError';
}
