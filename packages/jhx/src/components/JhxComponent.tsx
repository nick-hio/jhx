import type { ComponentPropsWithoutRef, ElementType, JSX, PropsWithChildren } from 'react';

import { htmx } from '../lib/htmx';
import { jhx } from '../lib/jhx';
import type { JhxConfig, JhxProps } from '../types';

const isJhxAttribute = (key: string): key is keyof JhxProps => {
    return key.startsWith('hx-') || key in htmx.attr || key in htmx.eventAttr;
};

type NativeProps<TTag extends ElementType> = Omit<
    ComponentPropsWithoutRef<TTag>,
    'children' | keyof JhxProps<any>
>;

export type JhxComponentProps<TDom extends object = object, TTag extends ElementType = 'div'> = JhxProps<TDom>
    & NativeProps<TTag> & {
        jhxConfig?: Omit<JhxConfig, 'stringify'>;
        as?: TTag;
    };

export const JhxComponent = <TDom extends object = object, TTag extends ElementType = 'div'>(
    props: PropsWithChildren<JhxComponentProps<TDom, TTag>>,
): JSX.Element => {
    const { jhxConfig, as, children, ...remainingProps } = props as PropsWithChildren<
        JhxComponentProps<TDom, TTag>
    > & { as?: TTag };

    const Tag = as ?? 'div';
    const otherProps: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(remainingProps)) {
        if (!isJhxAttribute(key)) {
            otherProps[key] = value as unknown;
        }
    }

    const attrs = jhx(remainingProps, {
        ...jhxConfig,
        stringify: false,
    });
    const merged = { ...attrs, ...otherProps };

    return <Tag {...merged}>{children}</Tag>;
};

export type JhxComponentType<
    TDom extends object = object,
    TTag extends keyof JSX.IntrinsicElements = 'div',
> = typeof JhxComponent<TDom, TTag>;
