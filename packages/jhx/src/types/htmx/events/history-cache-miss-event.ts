import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxHistoryCacheMissEventProperties = 'path' | 'target';

export interface HtmxHistoryCacheMissEvent extends HtmxDomEvent {
    detail: Detail<HtmxHistoryCacheMissEventProperties>;
    type: 'htmx:historyCacheMiss';
}
