import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxOobErrorNoTargetEventProperties = 'content' | 'elt' | 'error';

export interface HtmxOobErrorNoTargetEvent extends HtmxDomEvent {
    detail: Detail<HtmxOobErrorNoTargetEventProperties>;
    type: 'htmx:oobErrorNoTarget';
}
