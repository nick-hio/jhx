import type { JhxTriggerAttribute, JhxTriggerFrom } from '../types';
import { toJhxTargetAttribute } from './to-jhx-target-attribute';

const toJhxFromAttribute = (target: JhxTriggerFrom): string | undefined => {
    if (!target) {
        return undefined;
    }

    if (typeof target === 'object') {
        if (target.op === 'this' || target.op === 'document' || target.op === 'window') {
            return target.op;
        } else if (typeof target.selector === 'string' && typeof target.op === 'string') {
            return `${target.op} ${target.selector}`;
        }
    }

    return String(target);
};

export const toJhxTriggerAttribute = (trigger: JhxTriggerAttribute): string => {
    if (typeof trigger === 'string') {
        return trigger;
    }

    const triggers = Array.isArray(trigger) ? trigger : [trigger];

    return triggers
        .map((trigger) => {
            if (typeof trigger === 'string') {
                return trigger;
            } else if (typeof trigger === 'object') {
                const eventAndFilter = `${trigger.event || ''}${trigger.filter ? `[${trigger.filter}]` : ''}`;
                const parts: string[] = [];

                if (trigger.once === true) parts.push('once');
                if (trigger.changed === true) parts.push('changed');
                if (trigger.consume === true) parts.push('consume');
                if (trigger.delay) parts.push(`delay:${trigger.delay}`);
                if (trigger.from) parts.push(`from:${toJhxFromAttribute(trigger.from)}`);
                if (trigger.target) parts.push(`target:${toJhxTargetAttribute(trigger.target)}`);
                if (trigger.throttle) parts.push(`throttle:${trigger.throttle}`);
                if (trigger.queue) parts.push(`queue:${trigger.queue}`);

                return eventAndFilter.concat(eventAndFilter ? ' ' : '', parts.join(' '));
            }

            return '';
        })
        .filter(Boolean)
        .join(', ');
};
