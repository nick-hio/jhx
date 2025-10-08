import type { JhxEvaluableAttribute } from './attributes/evaluable-attribute';
import type { JhxExtensionAttribute } from './attributes/extension-attribute';
import type { JhxIndicatorAttribute } from './attributes/indicator-attribute';
import type { JhxInheritAttribute } from './attributes/inherit-attribute';
import type { JhxParamsAttribute } from './attributes/params-attribute';
import type { JhxRequestAttribute } from './attributes/request-attribute';
import type { JhxSelectOobAttribute } from './attributes/select-oob-attribute';
import type { JhxSwapAttribute } from './attributes/swap-attribute';
import type { JhxSwapOobAttribute } from './attributes/swap-oob-attribute';
import type { JhxSyncAttribute } from './attributes/sync-attribute';
import type { JhxTargetAttribute } from './attributes/target-attribute';
import type { JhxTriggerAttribute } from './attributes/trigger-attribute';

export interface HtmxProps<
    /** Type for additional parameters received from the DOM. */
    TDom extends object = object,
> {
    boost?: boolean;
    confirm?: string;
    disable?: boolean;
    disabledElt?: JhxTargetAttribute;
    disinherit?: JhxInheritAttribute;
    encoding?: string;
    ext?: JhxExtensionAttribute;
    headers?: JhxEvaluableAttribute<TDom>;
    history?: boolean;
    historyElt?: boolean;
    include?: JhxTargetAttribute;
    indicator?: JhxIndicatorAttribute;
    inherit?: JhxInheritAttribute;
    params?: JhxParamsAttribute;
    preserve?: boolean;
    prompt?: string;
    pushUrl?: boolean | string;
    replaceUrl?: boolean | string;
    request?: JhxRequestAttribute<TDom>;
    select?: string;
    selectOob?: JhxSelectOobAttribute;
    swap?: JhxSwapAttribute;
    swapOob?: JhxSwapOobAttribute;
    sync?: JhxSyncAttribute;
    target?: JhxTargetAttribute;
    trigger?: JhxTriggerAttribute;
    validate?: boolean;
    vals?: JhxEvaluableAttribute<TDom>;
    /** Deprecated. Use `vals` instead. */
    vars?: never;
}
