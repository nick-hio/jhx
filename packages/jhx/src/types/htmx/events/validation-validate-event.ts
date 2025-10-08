import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxValidationValidateEventProperties = 'elt';

export interface HtmxValidationValidateEvent extends HtmxDomEvent {
    detail: Detail<HtmxValidationValidateEventProperties>;
    type: 'htmx:validation:validate';
}
