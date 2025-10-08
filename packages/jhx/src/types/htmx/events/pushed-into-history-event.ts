import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxPushedIntoHistoryEventProperties = 'elt' | 'path';

export interface HtmxPushedIntoHistoryEvent extends HtmxDomEvent {
    detail: Detail<HtmxPushedIntoHistoryEventProperties>;
    type: 'htmx:pushedIntoHistory';
}
