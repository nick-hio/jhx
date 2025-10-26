import type { HtmxEventName } from './constants';
import type { HtmxEventDetail } from './htmx-event-detail.ts';

export interface HtmxDomEvent extends Event {
    detail: HtmxEventDetail;
    type: HtmxEventName;
}
