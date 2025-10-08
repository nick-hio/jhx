import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxAfterOnLoadEventProperties =
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

export interface HtmxAfterOnLoadEvent extends HtmxDomEvent {
    detail: Detail<HtmxAfterOnLoadEventProperties>;
    type: 'htmx:afterOnLoad';
}
