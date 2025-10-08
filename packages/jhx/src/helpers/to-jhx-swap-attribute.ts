import type { JhxSwapAttribute, JhxSwapScroll, JhxSwapShow } from '../types';

const processScrollOrShow = (prefix: 'scroll' | 'show', value: JhxSwapScroll | JhxSwapShow): string => {
    if (typeof value === 'string') {
        return `${prefix}:${value}`;
    }
    if ('window' in value) {
        return `${prefix}:window:${value.position}`;
    }
    if ('selector' in value) {
        return `${prefix}:${value.selector}:${value.position}`;
    }
    return '';
};

export const toJhxSwapAttribute = (swap?: JhxSwapAttribute): string | undefined => {
    if (!swap) return undefined;
    if (typeof swap === 'string') return swap;

    const parts: string[] = [];

    if (swap.style) parts.push(String(swap.style));
    if (swap.swap) parts.push(`swap:${swap.swap}`);
    if (swap.settle) parts.push(`settle:${swap.settle}`);
    if (typeof swap.transition === 'boolean') parts.push(`transition:${swap.transition}`);
    if (swap.scroll) parts.push(processScrollOrShow('scroll', swap.scroll));
    if (swap.show) parts.push(processScrollOrShow('show', swap.show));
    if (swap.ignoreTitle) parts.push('ignoreTitle:true');
    if (typeof swap.focusScroll === 'boolean') parts.push(`focus-scroll:${swap.focusScroll}`);

    return parts.filter(Boolean).join(' ');
};
