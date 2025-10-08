import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxSendErrorEventProperties = 'elt' | 'requestConfig' | 'target' | 'xhr';

export interface HtmxSendErrorEvent extends HtmxDomEvent {
    detail: Detail<HtmxSendErrorEventProperties>;
    type: 'htmx:sendError';
}
