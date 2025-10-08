import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxHistoryCacheMissLoadEventProperties = 'historyElt' | 'path' | 'response' | 'swapSpec' | 'xhr';

export interface HtmxHistoryCacheMissLoadEvent extends HtmxDomEvent {
    detail: Detail<HtmxHistoryCacheMissLoadEventProperties>;
    type: 'htmx:historyCacheMissLoad';
}
