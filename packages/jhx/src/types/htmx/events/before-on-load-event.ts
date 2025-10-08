import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxBeforeOnLoadEventProperties =
    | 'boosted'
    | 'elt'
    | 'etc'
    | 'failed'
    | 'pathInfo'
    | 'requestConfig'
    | 'select'
    | 'successful'
    | 'target'
    | 'xhr';

export interface HtmxBeforeOnLoadEvent extends HtmxDomEvent {
    detail: Detail<HtmxBeforeOnLoadEventProperties>;
    type: 'htmx:beforeOnLoad';
}
