import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxSseOpenEventProperties = 'event' | 'source';

export interface HtmxSseOpenEvent extends HtmxDomEvent {
    detail: Detail<HtmxSseOpenEventProperties>;
    type: 'htmx:sseOpen';
}
