import type { HtmxEventDetail } from '../htmx-event-detail';

export type Detail<TProperties extends keyof HtmxEventDetail> = Pick<
    Required<HtmxEventDetail>,
    TProperties
> & {
    [K in Exclude<keyof HtmxEventDetail, TProperties>]?: never;
};
