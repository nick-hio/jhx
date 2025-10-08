import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxBeforeSendEventProperties =
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

export interface HtmxBeforeSendEvent extends HtmxDomEvent {
    detail: Detail<HtmxBeforeSendEventProperties>;
    type: 'htmx:beforeSend';
}
