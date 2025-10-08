import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxNoSseSourceErrorEventProperties = 'error' | 'source';

export interface HtmxNoSseSourceErrorEvent extends HtmxDomEvent {
    detail: Detail<HtmxNoSseSourceErrorEventProperties>;
    type: 'htmx:noSSESourceError';
}
