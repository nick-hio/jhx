import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxValidationFailedEventProperties = 'elt' | 'message' | 'validity';

export interface HtmxValidationFailedEvent extends HtmxDomEvent {
    detail: Detail<HtmxValidationFailedEventProperties>;
    type: 'htmx:validation:failed';
}
