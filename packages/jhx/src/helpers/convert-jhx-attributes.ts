import { JhxErrorThrowable } from '../lib/jhx-error';
import type { HtmxAttribute, HtmxProps, JhxConfig, JhxRouteProps } from '../types';
import { extractFunction } from './extract-function';
import { toJhxSwapAttribute } from './to-jhx-swap-attribute';
import { toJhxTargetAttribute } from './to-jhx-target-attribute';
import { toJhxTriggerAttribute } from './to-jhx-trigger-attribute';

const requestKeys = ['get', 'post', 'put', 'patch', 'delete', 'route'] as const;

export const convertJhxAttributes = <TDom extends object = object>(
    options: HtmxProps<TDom> & JhxRouteProps,
    config: Required<JhxConfig>,
): Record<HtmxAttribute, string> => {
    const attributes: Record<string, string> = {};
    if (!options || typeof options !== 'object') {
        return attributes;
    }

    const methodKey = requestKeys.find((k) => Boolean(options[k]));
    if (methodKey) {
        if (methodKey === 'route') {
            const method = options.method?.toLowerCase() || 'get';
            attributes[`hx-${method}`] = String(options.route);
        } else {
            attributes[`hx-${methodKey}`] = String(options[methodKey]);
        }
    } else if (options.method) {
        config.logger.warn(
            "[jhx] The 'method' prop must be paired with a 'route' prop to generate a request attribute.",
        );
    }

    if (options.boost === true) {
        attributes['hx-boost'] = 'true';
    }

    if (options.confirm) {
        attributes['hx-confirm'] = options.confirm;
    }

    if (options.disable === true) {
        attributes['hx-disable'] = 'true';
    }

    if (options.disabledElt) {
        const target = toJhxTargetAttribute(options.disabledElt);
        if (target) {
            attributes['hx-disabled-elt'] = target;
        }
    }

    if (options.disinherit) {
        if (Array.isArray(options.disinherit)) {
            attributes['hx-disinherit'] = options.disinherit.join(' ');
        } else {
            attributes['hx-disinherit'] = options.disinherit;
        }
    }

    if (options.encoding) {
        attributes['hx-encoding'] = options.encoding;
    }

    if (options.ext) {
        if (typeof options.ext === 'string') {
            attributes['hx-ext'] = options.ext;
        }

        const extArray = Array.isArray(options.ext) ? options.ext : [options.ext];
        const extensions = extArray
            .map((ext) => {
                if (typeof ext === 'object') {
                    return `${ext?.name && ext.ignore === true ? 'ignore:' : ''}${ext?.name}`;
                }
                return ext;
            })
            .filter(Boolean)
            .join(',');

        if (extensions) {
            attributes['hx-ext'] = extensions;
        }
    }

    if (options.headers) {
        if (typeof options.headers === 'object') {
            try {
                attributes['hx-headers'] = `${JSON.stringify(options.headers)}`;
            } catch (e) {
                config.logger.error('[jhx] Error while parsing the `hx-headers` object.');
                throw new JhxErrorThrowable("[jhx] Error while parsing 'hx-request' object", {
                    attribute: 'hx-headers',
                    cause: e as TypeError,
                    stack: e instanceof Error && typeof e.stack === 'string' ? e.stack : undefined,
                });
            }
        } else if (typeof options.headers === 'function') {
            const func = extractFunction(options.headers);
            if (func) {
                const iife = `((${func.params.join(',')}) => ${func.body})(${func.params.join(',')})`;
                attributes['hx-vals'] = `js:{...${iife}}`;
            }
        } else {
            attributes['hx-headers'] = options.headers;
        }
    }

    if (options.history === false) {
        attributes['hx-history'] = 'false';
    }

    if (options.historyElt === true) {
        attributes['hx-history-elt'] = 'true';
    }

    if (options.indicator) {
        if (typeof options.indicator === 'object') {
            const inherit = options.indicator.inherit === true ? 'inherit, ' : '';
            const closest = options.indicator.closest === true ? 'closest ' : '';
            attributes['hx-indicator'] = `${inherit}${closest}${options.indicator.selector}`;
        } else {
            attributes['hx-indicator'] = options.indicator;
        }
    }

    if (options.include) {
        const target = toJhxTargetAttribute(options.include);
        if (target) {
            attributes['hx-include'] = target;
        }
    }

    if (options.inherit) {
        if (Array.isArray(options.inherit)) {
            attributes['hx-inherit'] = options.inherit.join(' ');
        } else {
            attributes['hx-inherit'] = options.inherit;
        }
    }

    if (options.params) {
        if (typeof options.params === 'object') {
            if (options.params.include && Array.isArray(options.params.include)) {
                attributes['hx-params'] = `${options.params.include.join(',')}`;
            } else if (options.params.exclude && Array.isArray(options.params.exclude)) {
                attributes['hx-params'] = `not ${options.params.exclude.join(',')}`;
            }
        } else {
            attributes['hx-params'] = options.params;
        }
    }

    if (options.preserve === true) {
        attributes['hx-preserve'] = 'true';
    }

    if (options.prompt) {
        attributes['hx-prompt'] = options.prompt;
    }

    if (options.pushUrl) {
        if (options.pushUrl === true) {
            attributes['hx-push-url'] = 'true';
        } else {
            attributes['hx-push-url'] = options.pushUrl;
        }
    }

    if (options.replaceUrl || options.replaceUrl === false) {
        if (typeof options.replaceUrl === 'boolean') {
            attributes['hx-replace-url'] = options.replaceUrl ? 'true' : 'false';
        } else {
            attributes['hx-replace-url'] = options.replaceUrl;
        }
    }

    if (options.request) {
        if (typeof options.request === 'object') {
            try {
                attributes['hx-request'] = `${JSON.stringify(options.request)}`;
            } catch (e) {
                throw new JhxErrorThrowable("[jhx] Error while parsing 'hx-request' object", {
                    attribute: 'hx-request',
                    cause: e as TypeError,
                    stack: e instanceof Error && typeof e.stack === 'string' ? e.stack : undefined,
                });
            }
        } else if (typeof options.request === 'function') {
            const func = extractFunction(options.request);
            if (func) {
                const innerIife = `((${func.params.join(',')}) => ${func.body})(${func.params.join(',')})`;
                const outerIife = `(({ timeout, credentials, noHeaders }) => ({ timeout, credentials, noHeaders }))(${innerIife})`;
                attributes['hx-request'] = `js: ${outerIife}`;
            }
        } else {
            attributes['hx-request'] = options.request;
        }
    }

    if (options.select) {
        attributes['hx-select'] = options.select;
    }

    if (options.selectOob) {
        if (Array.isArray(options.selectOob)) {
            attributes['hx-select-oob'] = options.selectOob
                .map((oob) => {
                    if (typeof oob === 'string') {
                        return oob;
                    }
                    if (typeof oob === 'object' && oob.selector) {
                        const swap = toJhxSwapAttribute(oob.swap);
                        return `${oob.selector}${swap ? ':' + swap : ''}`;
                    }
                    return '';
                })
                .filter(Boolean)
                .join(',');
        } else if (typeof options.selectOob === 'object') {
            const swap = toJhxSwapAttribute(options.selectOob.swap);
            attributes['hx-select-oob'] = `${options.selectOob.selector}${swap ? ':' + swap : ''}`;
        } else {
            attributes['hx-select-oob'] = options.selectOob;
        }
    }

    if (options.swap) {
        const swap = toJhxSwapAttribute(options.swap);
        if (swap) {
            attributes['hx-swap'] = swap;
        }
    }

    if (options.swapOob) {
        if (options.swapOob === true) {
            attributes['hx-swap-oob'] = 'true';
        } else if (typeof options.swapOob === 'object') {
            const swap = toJhxSwapAttribute(options.swapOob.swap);
            if (swap) {
                attributes['hx-swap-oob'] =
                    `${swap}${options.swapOob.selector ? ':' + options.swapOob.selector : ''}`;
            }
        } else {
            attributes['hx-swap-oob'] = options.swapOob;
        }
    }

    if (options.sync) {
        if (typeof options.sync === 'object') {
            if (options.sync.strategy && options.sync.tag) {
                attributes['hx-sync'] =
                    `${options.sync.closest === true ? 'closest ' : ''}${options.sync.tag}:${options.sync.strategy}`;
            } else if (options.sync.strategy) {
                attributes['hx-sync'] = `this:${options.sync.strategy}`;
            }
        } else {
            attributes['hx-sync'] = options.sync;
        }
    }

    if (options.target) {
        const target = toJhxTargetAttribute(options.target);
        if (target) {
            attributes['hx-target'] = target;
        }
    }

    if (options.trigger) {
        attributes['hx-trigger'] = toJhxTriggerAttribute(options.trigger);
    }

    if (options.validate === true) {
        attributes['hx-validate'] = 'true';
    }

    if (options.vars) {
        config.logger.warn(
            '[jhx] The `hx-vars` attribute has been deprecated because of XSS vulnerabilities. Recommended to use the `hx-vals` attribute.',
        );
        attributes['hx-vars'] = options.vars;
    }

    if (options.vals) {
        if (typeof options.vals === 'object') {
            try {
                attributes['hx-vals'] = `${JSON.stringify(options.vals)}`;
            } catch (e) {
                throw new JhxErrorThrowable("[jhx] Error while parsing 'hx-vals' object", {
                    attribute: 'hx-vals',
                    cause: e as TypeError,
                    stack: e instanceof Error && typeof e.stack === 'string' ? e.stack : undefined,
                });
            }
        } else if (typeof options.vals === 'function') {
            const func = extractFunction(options.vals);
            if (func) {
                const iife = `((${func.params.join(',')}) => ${func.body})(${func.params.join(',')})`;
                attributes['hx-vals'] = `js:{...${iife}}`;
            }
        } else {
            attributes['hx-vals'] = options.vals;
        }
    }

    return attributes;
};
