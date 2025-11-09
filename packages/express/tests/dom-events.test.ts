import { afterAll, describe, expect, it } from 'bun:test';

import { buildServer, closeServers, PortGenerator } from './helpers';

type TDom = {
    customVar: string;
}

const testServers: any[] = [];

describe('dom events', async () => {
    afterAll(async () => {
        await closeServers(testServers);
    });

    const ports = new PortGenerator(21000);

    it('allow DOM event handlers', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port);

        const result = jhx<TDom>({
            onMouseDown: () => console.log('test'),
            onClick: ({ document }) => console.log(document),
            onMouseOver: ({ window }) => console.log(window),
            onMouseOut: ({ customVar }) => console.log(customVar),
        }, {
            stringify: true,
        });
        expect(result).toBe('onmousedown="(() &#61;&gt; { return console.log(&quot;test&quot;) })()" onclick="(({ document }) &#61;&gt; { return console.log(document) })({ document })" onmouseover="(({ window }) &#61;&gt; { return console.log(window) })({ window })" onmouseout="(({ customVar }) &#61;&gt; { return console.log(customVar) })({ customVar })"');
    });

    it('allow other event handlers', async () => {
        const port = ports.getPort();
        const { jhx } = buildServer(testServers, port);

        const result = jhx<TDom>({
            onCustomEvent: () => console.log('test'),
            onOtherEvent: ({ document }) => console.log(document),
            onDifferentEvent: ({ window }) => console.log(window),
            onNewEvent: ({ customVar }) => console.log(customVar),
        }, {
            stringify: true,
        });
        expect(result).toBe('oncustomevent="(() &#61;&gt; { return console.log(&quot;test&quot;) })()" onotherevent="(({ document }) &#61;&gt; { return console.log(document) })({ document })" ondifferentevent="(({ window }) &#61;&gt; { return console.log(window) })({ window })" onnewevent="(({ customVar }) &#61;&gt; { return console.log(customVar) })({ customVar })"');
    });
});
