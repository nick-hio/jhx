import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxValidationHaltedEventProperties =
    | 'boosted'
    | 'elt'
    | 'errors'
    | 'formData'
    | 'headers'
    | 'parameters'
    | 'path'
    | 'target'
    | 'timeout'
    | 'triggeringEvent'
    | 'unfilteredFormData'
    | 'unfilteredParameters'
    | 'useUrlParams'
    | 'verb'
    | 'withCredentials';

export interface HtmxValidationHaltedEvent extends HtmxDomEvent {
    detail: Detail<HtmxValidationHaltedEventProperties>;
    type: 'htmx:validation:halted';
}
