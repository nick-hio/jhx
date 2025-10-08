import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxReplacedInHistoryEventProperties = 'elt' | 'path';

export interface HtmxReplacedInHistoryEvent extends HtmxDomEvent {
    detail: Detail<HtmxReplacedInHistoryEventProperties>;
    type: 'htmx:replacedInHistory';
}
