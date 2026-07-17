import { describe, expect, it } from 'bun:test';

import { buildServer } from './helpers';

type TDom = {
    customVar: string;
}

describe('dom events', async () => {
    it('allow DOM event handlers', async () => {
        const fastify = await buildServer();

        const result = fastify.jhx<TDom>({
            onMouseDown: () => console.log('test'),
            onClick: ({ document }) => console.log(document),
            onMouseOver: ({ window }) => console.log(window),
            onMouseOut: ({ customVar }) => console.log(customVar),
        }, {
            stringify: true,
        });
        expect(result).toBe('onmousedown="(() => { return console.log(\'test\') })()" onclick="(({ document }) => { return console.log(document) })({ document })" onmouseover="(({ window }) => { return console.log(window) })({ window })" onmouseout="(({ customVar }) => { return console.log(customVar) })({ customVar })"');
    });

    it('allow other event handlers', async () => {
        const fastify = await buildServer();

        const result = fastify.jhx<TDom>({
            onCustomEvent: () => console.log('test'),
            onOtherEvent: ({ document }) => console.log(document),
            onDifferentEvent: ({ window }) => console.log(window),
            onNewEvent: ({ customVar }) => console.log(customVar),
        }, {
            stringify: true,
        });
        expect(result).toBe('oncustomevent="(() => { return console.log(\'test\') })()" onotherevent="(({ document }) => { return console.log(document) })({ document })" ondifferentevent="(({ window }) => { return console.log(window) })({ window })" onnewevent="(({ customVar }) => { return console.log(customVar) })({ customVar })"');
    });
});
