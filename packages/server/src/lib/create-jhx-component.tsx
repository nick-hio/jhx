import type {
    ServerJhx,
    ServerJhxComponentProps,
    ServerJhxComponentType,
    ServerJhxHandler,
    ServerJhxPartialRoute,
    ServerJhxProps,
    ServerJhxRoute,
} from '../types';

export const createJhxComponent = <
    TDom extends object,
    TReturn,
    TReq,
    TRes,
    THandler extends ServerJhxHandler<TReturn, TReq, TRes>,
    TBaseProps extends ServerJhxProps<TDom, TReturn, TReq, TRes, THandler>,
    TCompProps extends ServerJhxComponentProps<TDom, TReturn, TReq, TRes, THandler, TBaseProps>,
    TRoute extends ServerJhxRoute<TReturn, TReq, TRes, THandler>,
    TPartialRoute extends ServerJhxPartialRoute<TReturn, TReq, TRes, THandler>,
>(
    jhx: ServerJhx<TDom, TReturn, TReq, TRes, any, THandler, TRoute, TPartialRoute>,
) => {
    const JhxComponent: ServerJhxComponentType<
        TDom,
        TReturn,
        TReq,
        TRes,
        THandler,
        TBaseProps,
        TCompProps
    > = (props) => {
        const {
            jhxConfig,
            as: Tag = 'div',
            children,
            ...remainingProps
        } = props;

        const attrs = jhx(
            { ...remainingProps },
            {
                ...jhxConfig,
                stringify: false,
            },
        );

        return (
            <Tag
                {...attrs}
            >
                {children}
            </Tag>
        );
    };

    JhxComponent.displayName = 'JhxComponentFactory';
    return JhxComponent;
};
