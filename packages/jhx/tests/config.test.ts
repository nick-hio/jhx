import { describe, expect, it } from 'bun:test';

import { jhx } from '../src';

describe('config.escape', () => {
    it('default', () => {
        const result = jhx({
            onClick: () => alert('Clicked!'),
        }, {
            stringify: true,
        });
        expect(result).toBe('onclick="(() &#61;&gt; { return alert(&quot;Clicked!&quot;) })()"');
    });

    it('true', () => {
        const result = jhx({
            onClick: () => alert('Clicked!'),
        }, {
            stringify: true,
            escape: true,
        });
        expect(result).toBe('onclick="(() &#61;&gt; { return alert(&quot;Clicked!&quot;) })()"');
    });

    it('false', () => {
        const result = jhx({
            onClick: () => alert('Clicked!'),
        }, {
            stringify: true,
            escape: false,
        });

        expect(result).toBe('onclick="(() => { return alert("Clicked!") })()"');
    });
});

const expectRecord = (v: Record<string, unknown>) => v;
const expectString = (v: string) => v;

describe('config.stringify', () => {
    it('default', () => {
        const result = jhx({ route: '/api/example' });
        expectRecord(result);
        expect(typeof result).toBe('object');
    });

    it('true', () => {
        const result = jhx({ route: '/api/example' }, { stringify: true });
        expectString(result);
        expect(typeof result).toBe('string');
    });

    it('false', () => {
        const result = jhx({ route: '/api/example' }, { stringify: false });
        expectRecord(result);
        expect(typeof result).toBe('object');
    });
});