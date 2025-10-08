import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxConfirmEventProperties =
    | 'elt'
    | 'etc'
    | 'issueRequest'
    | 'path'
    | 'question'
    | 'target'
    | 'triggeringEvent'
    | 'verb';

export interface HtmxConfirmEvent extends HtmxDomEvent {
    detail: Detail<HtmxConfirmEventProperties>;
    type: 'htmx:confirm';
}
