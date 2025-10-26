import { convertDomEventAttributes } from '../helpers/convert-dom-event-attributes';
import { convertJhxAttributes } from '../helpers/convert-jhx-attributes';
import { convertJhxEventAttributes } from '../helpers/convert-jhx-event-attributes';
import type { JhxAttribute, JhxConfig, JhxDomProps, JhxProps } from '../types';
import { attributesToString } from './attributes-to-string';
import { defaultConfig } from './default-config';
import { escapeAttributes } from './escape-attributes';

/**
 * Returns an object or string containing HTMX and HTML attributes.
 * @template TDom Type for additional parameters from within the DOM.
 */
export function jhx<TDom extends object = object>(
    props: JhxDomProps<TDom>,
    config: Omit<JhxConfig, 'stringify'> & { stringify: true },
): string;
export function jhx<TDom extends object = object>(
    props: JhxProps<TDom>,
    config: Omit<JhxConfig, 'stringify'> & { stringify: false },
): Record<JhxAttribute, string>;
export function jhx<TDom extends object = object>(
    props: JhxProps<TDom>,
    config?: Omit<JhxConfig, 'stringify'> & { stringify?: false },
): Record<JhxAttribute, string>;
export function jhx<TDom extends object = object>(
    props: JhxProps<TDom> | JhxDomProps<TDom>,
    config?: JhxConfig,
): string | Record<JhxAttribute, string> {
    const fullConfig = {
        ...defaultConfig,
        ...(config ?? {}),
    };

    const attributes = {
        ...convertJhxAttributes(props, fullConfig),
        ...convertJhxEventAttributes(props),
        ...convertDomEventAttributes(props),
    } as Record<JhxAttribute, string>;

    return fullConfig.stringify === true
        ? attributesToString(attributes, Boolean(fullConfig.escape))
        : fullConfig.escape === true
          ? escapeAttributes(attributes)
          : attributes;
}
