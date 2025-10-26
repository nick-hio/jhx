import { describe, expect, it } from 'bun:test';

import { jhx } from '../src';

describe('method props', () => {
    it('default', () => {
        const result = jhx({ route: '/api' });
        expect(result['hx-get']).toEqual('/api');
    });

    it("set to 'get'", () => {
        const result = jhx({ route: '/api', method: 'get' });
        expect(result['hx-get']).toEqual('/api');
    });

    it("set to 'post'", () => {
        const result = jhx({ route: '/api', method: 'post' });
        expect(result['hx-post']).toEqual('/api');
    });

    it("set to 'put'", () => {
        const result = jhx({ route: '/api', method: 'put' });
        expect(result['hx-put']).toEqual('/api');
    });

    it("set to 'patch'", () => {
        const result = jhx({ route: '/api', method: 'patch' });
        expect(result['hx-patch']).toEqual('/api');
    });

    it("set to 'delete'", () => {
        const result = jhx({ route: '/api', method: 'delete' });
        expect(result['hx-delete']).toEqual('/api');
    });

    it("'get' overrides", () => {
        const result = jhx({
            get: '/api',
            post: '/api',
            put: '/api',
            patch: '/api',
            delete: '/api',
            route: '/other',
        });
        expect(result['hx-get']).toEqual('/api');
    });

    it("'post' overrides", () => {
        const result = jhx({
            post: '/api',
            put: '/api',
            patch: '/api',
            delete: '/api',
            route: '/other',
        });
        expect(result['hx-post']).toEqual('/api');
    });

    it("'put' overrides", () => {
        const result = jhx({
            put: '/api',
            patch: '/api',
            delete: '/api',
            route: '/other',
        });
        expect(result['hx-put']).toEqual('/api');
    });

    it("'patch' overrides", () => {
        const result = jhx({
            patch: '/api',
            delete: '/api',
            route: '/other',
        });
        expect(result['hx-patch']).toEqual('/api');
    });

    it("'delete' overrides", () => {
        const result = jhx({
            delete: '/api',
            route: '/other',
        });
        expect(result['hx-delete']).toEqual('/api');
    });
});
