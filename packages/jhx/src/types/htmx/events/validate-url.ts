import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxValidateUrlEventProperties = 'url' | 'sameHost';

export interface HtmxValidateUrlEvent extends HtmxDomEvent {
    detail: Detail<HtmxValidateUrlEventProperties>;
    type: 'htmx:validateUrl';
}
