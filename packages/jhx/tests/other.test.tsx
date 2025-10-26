import { describe, expect, it } from 'bun:test';

import { jhx } from '../src';

describe('other tests', () => {
    it('allow other DOM event handlers', () => {
        const result = jhx({
            onClick: () => alert('Clicked!'),
            onOtherEvent: () => alert('Clicked!'),
        }, {
            stringify: true,
        });
        expect(result).toBe('onclick="(() &#61;&gt; { return alert(&quot;Clicked!&quot;) })()" onotherevent="(() &#61;&gt; { return alert(&quot;Clicked!&quot;) })()"');
    });
});
