import type { JhxTargetAttribute } from '../types';

export const toJhxTargetAttribute = (target: JhxTargetAttribute): string | undefined => {
    if (!target) {
        return undefined;
    }

    const inputArray = Array.isArray(target) ? target : [target];
    let usesInherit = false;

    const targets = inputArray.map((item) => {
        if (typeof item !== 'object') {
            return item;
        }

        if (item.inherit !== undefined) {
            if (!item.inherit) {
                return undefined;
            }
            usesInherit = true;
            return undefined;
        }
        if (item.position === 'this' || item.position === 'next' || item.position === 'previous') {
            return item.position;
        }

        const target = [];
        if (typeof item?.position === 'string') {
            target.push(item.position);
        }
        if (typeof item.selector === 'string') {
            target.push(item.selector);
        }
        return target.join(' ');
    });

    if (usesInherit) {
        targets.unshift('inherit');
    }

    return targets.filter((item) => Boolean(item)).join(', ');
};
