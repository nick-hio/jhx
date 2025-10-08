import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxBeforeCleanupElementEventProperties = 'elt';

export interface HtmxBeforeCleanupElementEvent extends HtmxDomEvent {
    detail: Detail<HtmxBeforeCleanupElementEventProperties>;
    type: 'htmx:beforeCleanupElement';
}
