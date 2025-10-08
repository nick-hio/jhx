import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxHistoryCacheErrorEventProperties = 'error' | 'path' | 'target';

export interface HtmxHistoryCacheErrorEvent extends HtmxDomEvent {
    detail: Detail<HtmxHistoryCacheErrorEventProperties>;
    type: 'htmx:historyCacheError';
}
