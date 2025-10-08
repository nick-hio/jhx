import type { HtmxEventName } from '../../lib/htmx';
import type { HtmxEventDetail } from './htmx-event-detail.ts';

export interface HtmxDomEvent extends Event {
    detail: HtmxEventDetail;
    type: HtmxEventName;
}
