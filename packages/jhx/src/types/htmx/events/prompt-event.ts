import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxPromptEventProperties = 'elt' | 'prompt' | 'target';

export interface HtmxPromptEvent extends HtmxDomEvent {
    detail: Detail<HtmxPromptEventProperties>;
    type: 'htmx:prompt';
}
