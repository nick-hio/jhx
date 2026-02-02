import { describe, expect, it } from 'bun:test';

import { jhx } from '../src';

type TDom = {
    customVar: string;
    otherVar: number;
}

describe('other tests', () => {
    it('stringified function with backtick', () => {
        const result = jhx<TDom>({
            vals: ({ document, customVar }) => console.log(`${document}${customVar}`),
            request: ({ otherVar }) => ({ timeout: otherVar }),
        });
        expect(result as object).toEqual({
            'hx-vals': 'js:{...(({ document, customVar }) =&gt; { return console.log(`${document}${customVar}`) })({ document, customVar })}',
            'hx-request': 'js: (({ timeout, credentials, noHeaders }) =&gt; ({ timeout, credentials, noHeaders }))((({ otherVar }) =&gt; { return ({ timeout: otherVar }) })({ otherVar }))',
        });
    });

    it('stringified function with single-quote', () => {
        const result = jhx<TDom>({
            vals: ({ document, customVar }) => console.log('Document: ', document, customVar),
        });
        expect(result as object).toEqual({
            'hx-vals': `js:{...(({ document, customVar }) =&gt; { return console.log('Document: ', document, customVar) })({ document, customVar })}`,
        });
    });

    it('stringified function with double-quote', () => {
        const result = jhx<TDom>({
            vals: ({ document, customVar }) => console.log("Document: ", document, customVar),
        });
        expect(result as object).toEqual({
            'hx-vals': `js:{...(({ document, customVar }) =&gt; { return console.log('Document: ', document, customVar) })({ document, customVar })}`,
        });
    });

    it('allow DOM event handlers', () => {
        const result = jhx<TDom>({
            onMouseDown: () => console.log('test'),
            onClick: ({ document }) => console.log(document),
            onMouseOver: ({ window }) => console.log(window),
            onMouseOut: ({ customVar }) => console.log(customVar),
        }, {
            stringify: true,
        });
        expect(result).toBe(`onmousedown="(() =&gt; { return console.log('test') })()" onclick="(({ document }) =&gt; { return console.log(document) })({ document })" onmouseover="(({ window }) =&gt; { return console.log(window) })({ window })" onmouseout="(({ customVar }) =&gt; { return console.log(customVar) })({ customVar })"`);
    });

    it('allow other event handlers', () => {
        const result = jhx<TDom>({
            onCustomEvent: () => console.log('test'),
            onOtherEvent: ({ document }) => console.log(document),
            onDifferentEvent: ({ window }) => console.log(window),
            onNewEvent: ({ customVar }) => console.log(customVar),
        }, {
            stringify: true,
        });
        expect(result).toBe(`oncustomevent="(() =&gt; { return console.log('test') })()" onotherevent="(({ document }) =&gt; { return console.log(document) })({ document })" ondifferentevent="(({ window }) =&gt; { return console.log(window) })({ window })" onnewevent="(({ customVar }) =&gt; { return console.log(customVar) })({ customVar })"`);
    });
});
