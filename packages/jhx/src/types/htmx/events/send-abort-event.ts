import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxSendAbortEventProperties =
    | 'boosted'
    | 'elt'
    | 'error'
    | 'etc'
    | 'pathInfo'
    | 'requestConfig'
    | 'select'
    | 'target'
    | 'xhr';

export interface HtmxSendAbortEvent extends HtmxDomEvent {
    detail: Detail<HtmxSendAbortEventProperties>;
    type: 'htmx:sendAbort';
}
