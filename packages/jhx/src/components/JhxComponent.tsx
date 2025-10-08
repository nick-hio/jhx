import type { FC, JSX, PropsWithChildren } from 'react';

import { jhx } from '../lib/jhx';
import type { JhxConfig, JhxProps } from '../types';

export interface JhxComponentProps<TDom extends object = object> extends JhxProps<TDom> {
    jhxConfig?: Omit<JhxConfig, 'stringify'>;
    as?: keyof JSX.IntrinsicElements;
}

export type JhxComponentType<TDom extends object = object> = FC<PropsWithChildren<JhxComponentProps<TDom>>>;

export const JhxComponent: FC<PropsWithChildren<JhxComponentProps>> = (props) => {
    const { jhxConfig, as: Tag = 'div', children, ...remainingProps } = props;

    const attrs = jhx(
        { ...remainingProps },
        {
            ...jhxConfig,
            stringify: false,
        },
    );

    return <Tag {...attrs}>{children}</Tag>;
};
