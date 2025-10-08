import type { JhxTargetAttribute } from '../types';

export const toJhxTargetAttribute = (target: JhxTargetAttribute | string): string | undefined => {
    if (!target) {
        return undefined;
    }

    let result: string[] = [];

    if (typeof target === 'object') {
        if (target.op === 'this') {
            return 'this';
        }

        if (typeof target.op === 'string') {
            result.push(target.op);
        }
        if (typeof target.selector === 'string') {
            result.push(target.selector);
        }
    } else {
        return String(target);
    }

    return result.join(' ');
};
