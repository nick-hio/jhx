import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxSseErrorEventProperties = 'error' | 'event' | 'source';

export interface HtmxSseErrorEvent extends HtmxDomEvent {
    detail: Detail<HtmxSseErrorEventProperties>;
    type: 'htmx:sseError';
}
