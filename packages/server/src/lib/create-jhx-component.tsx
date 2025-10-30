import type { ComponentPropsWithoutRef, ElementType, JSX, PropsWithChildren } from 'react';

import { htmx } from 'jhx';
import type { JhxConfig, JhxProps } from 'jhx';

import type {
    ServerJhx,
    ServerJhxHandler,
    ServerJhxPartialRoute,
    ServerJhxProps,
    ServerJhxRoute,
} from '../types';

const isJhxAttribute = (key: string): key is keyof JhxProps => {
    return (
        key.startsWith('hx-')
        || key in htmx.attr
        || key in htmx.eventAttr
        || key === 'route'
        || key === 'method'
    );
};

type NativeProps<TTag extends ElementType> = Omit<
    ComponentPropsWithoutRef<TTag>,
    'children' | keyof ServerJhxProps<any, any, any, any, any>
>;

export type ServerJhxComponentProps<
    TDom extends object,
    TReturn,
    TReq,
    TRes,
    THandler extends ServerJhxHandler<TReturn, TReq, TRes>,
    TTag extends ElementType = 'div',
> = ServerJhxProps<TDom, TReturn, TReq, TRes, THandler>
    & NativeProps<TTag> & {
        jhxConfig?: Omit<JhxConfig, 'stringify'>;
        as?: TTag;
    };

export type ServerJhxComponentType<
    TDom extends object,
    TReturn,
    TReq,
    TRes,
    THandler extends ServerJhxHandler<TReturn, TReq, TRes>,
> = <TTag extends ElementType = 'div'>(
    props: PropsWithChildren<ServerJhxComponentProps<TDom, TReturn, TReq, TRes, THandler, TTag>>,
) => JSX.Element;

export const createJhxComponent = <
    TBaseDom extends object,
    TReturn,
    TReq,
    TRes,
    THandler extends ServerJhxHandler<TReturn, TReq, TRes>,
    TRoute extends ServerJhxRoute<TReturn, TReq, TRes, THandler>,
    TPartialRoute extends ServerJhxPartialRoute<TReturn, TReq, TRes, THandler>,
>(
    jhx: ServerJhx<TBaseDom, TReturn, TReq, TRes, any, THandler, TRoute, TPartialRoute>,
) => {
    return function JhxComponent<
        TDom extends TBaseDom | object = TBaseDom | object,
        TTag extends ElementType = 'div',
    >(
        props: PropsWithChildren<ServerJhxComponentProps<TDom, TReturn, TReq, TRes, THandler, TTag>>,
    ): JSX.Element {
        const { jhxConfig, as, children, ...remainingProps } = props as PropsWithChildren<
            ServerJhxComponentProps<TDom, TReturn, TReq, TRes, THandler, TTag>
        > & { as?: TTag };

        const Tag = as ?? 'div';
        const otherProps: Record<string, unknown> = {};

        for (const [key, value] of Object.entries(remainingProps)) {
            if (!isJhxAttribute(key)) {
                otherProps[key] = value as unknown;
            }
        }

        const attrs = jhx<TDom>(remainingProps, {
            ...jhxConfig,
            stringify: false,
        });
        const merged = { ...attrs, ...otherProps };

        return <Tag {...merged}>{children}</Tag>;
    };
};
