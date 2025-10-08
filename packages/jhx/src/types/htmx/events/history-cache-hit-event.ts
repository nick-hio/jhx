import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxHistoryCacheHitEventProperties = 'item' | 'target';

export interface HtmxHistoryCacheHitEvent extends HtmxDomEvent {
    detail: Detail<HtmxHistoryCacheHitEventProperties>;
    type: 'htmx:historyCacheHit';
}
