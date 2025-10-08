import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxLoadEventProperties = 'elt';

export interface HtmxLoadEvent extends HtmxDomEvent {
    detail: Detail<HtmxLoadEventProperties>;
    type: 'htmx:load';
}
