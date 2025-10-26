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

/** @template TDom Additional variables that are available in the DOM. */
export interface HtmxProps<TDom extends object = object> {
    boost?: boolean;
    confirm?: string;
    delete?: string;
    disable?: boolean;
    disabledElt?: JhxTargetAttribute;
    disinherit?: JhxInheritAttribute;
    encoding?: string;
    ext?: JhxExtensionAttribute;
    get?: string;
    headers?: JhxEvaluableAttribute<TDom>;
    history?: boolean;
    historyElt?: boolean;
    include?: JhxTargetAttribute;
    indicator?: JhxIndicatorAttribute;
    inherit?: JhxInheritAttribute;
    patch?: string;
    params?: JhxParamsAttribute;
    post?: string;
    preserve?: boolean;
    prompt?: string;
    pushUrl?: boolean | string;
    put?: string;
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
