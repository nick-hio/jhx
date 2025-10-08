import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxHistoryRestoreEventProperties = 'elt' | 'historyElt' | 'item' | 'path' | 'swapSpec';

export interface HtmxHistoryRestoreEvent extends HtmxDomEvent {
    detail: Detail<HtmxHistoryRestoreEventProperties>;
    type: 'htmx:historyRestore';
}
