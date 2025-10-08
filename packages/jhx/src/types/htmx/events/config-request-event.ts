import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxConfigRequestEventProperties =
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

export interface HtmxConfigRequestEvent extends HtmxDomEvent {
    detail: Detail<HtmxConfigRequestEventProperties>;
    type: 'htmx:configRequest';
}
