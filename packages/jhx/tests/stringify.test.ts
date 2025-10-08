import { describe, expect, it } from 'bun:test';

import { jhx } from '../src';

const expectRecord = (v: Record<string, string>) => v;
const expectString = (v: string) => v;

describe('[jhx] config.stringify', () => {
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
