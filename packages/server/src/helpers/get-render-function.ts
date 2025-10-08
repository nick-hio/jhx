import { isValidElement } from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';

import type { ServerJhxRenderHandler } from '../types';

const jsxToStatic = (data: any, ..._args: any[]) =>
    isValidElement(data) ? renderToStaticMarkup(data) : data;
const jsxToString = (data: any, ..._args: any[]) => (isValidElement(data) ? renderToString(data) : data);
const noRender = (data: any, ..._args: any[]) => data;

export const getRenderFunction = <TRenderable, TRenderReturn, TRequest, TResponse>(
    render?:
        | 'static'
        | 'string'
        | ServerJhxRenderHandler<TRenderable, TRenderReturn, TRequest, TResponse>
        | false,
): ServerJhxRenderHandler<TRenderable, TRenderReturn, TRequest, TResponse> | null => {
    if (render === false) {
        return null;
    }
    if (typeof render === 'function') {
        return render as ServerJhxRenderHandler<TRenderable, TRenderReturn, TRequest, TResponse>;
    }
    return render === 'static'
        ? (jsxToStatic as ServerJhxRenderHandler<TRenderable, TRenderReturn, TRequest, TResponse>)
        : render === 'string'
          ? (jsxToString as ServerJhxRenderHandler<TRenderable, TRenderReturn, TRequest, TResponse>)
          : (noRender as ServerJhxRenderHandler<TRenderable, TRenderReturn, TRequest, TResponse>);
};
