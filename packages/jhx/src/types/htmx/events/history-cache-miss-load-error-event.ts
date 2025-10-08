import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxHistoryCacheMissLoadErrorEventProperties = 'path' | 'target' | 'xhr';

export interface HtmxHistoryCacheMissLoadErrorEvent extends HtmxDomEvent {
    detail: Detail<HtmxHistoryCacheMissLoadErrorEventProperties>;
    type: 'htmx:historyCacheMissLoadError';
}
