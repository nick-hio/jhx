import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxBeforeHistorySaveEventProperties = 'elt' | 'historyElt' | 'path';

export interface HtmxBeforeHistorySaveEvent extends HtmxDomEvent {
    detail: Detail<HtmxBeforeHistorySaveEventProperties>;
    type: 'htmx:beforeHistorySave';
}
