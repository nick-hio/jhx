import { convertDomEventAttributes } from '../helpers/convert-dom-event-attributes';
import { convertJhxAttributes } from '../helpers/convert-jhx-attributes';
import { convertJhxEventAttributes } from '../helpers/convert-jhx-event-attributes';
import type { JhxConfig, JhxDomProps, JhxProps } from '../types';
import { attributesToString } from './attributes-to-string';
import { defaultConfig } from './default-config';

/**
 * Returns an object or string containing HTMX and HTML attributes.
 * @template TDom Type for additional parameters from within the DOM.
 */
export function jhx<TDom extends object = object>(
    props: JhxDomProps<TDom>,
    config: JhxConfig & { stringify: true },
): string;
export function jhx<TDom extends object = object>(
    props: JhxProps<TDom>,
    config: JhxConfig & { stringify: false },
): Record<string, string>;
export function jhx<TDom extends object = object>(
    props: JhxProps<TDom>,
    config?: JhxConfig,
): Record<string, string>;
export function jhx<TDom extends object = object>(
    props: JhxProps<TDom> | JhxDomProps<TDom>,
    config?: JhxConfig,
): string | Record<string, string> {
    const fullConfig = {
        ...defaultConfig,
        ...(config ?? {}),
    };

    let attributes = convertJhxAttributes(props, fullConfig);
    attributes = convertJhxEventAttributes(attributes as typeof props);
    if (config?.stringify === true) {
        attributes = convertDomEventAttributes(attributes);
    }

    return config?.stringify === true
        ? attributesToString(attributes)
        : (attributes as Record<string, string>);
}
