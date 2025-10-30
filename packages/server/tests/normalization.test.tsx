import { describe, expect, it } from 'bun:test';

import { normalizeEndpoint } from '../src';

describe('[jhx-shared] normalizeEndpoint', async () => {
    it('root endpoint', async () => {
        const route = '/';

        const { noSlash, withSlash } = normalizeEndpoint(route);
        expect(noSlash).toBe('/');
        expect(withSlash).toBe('/');
    });

    it('root endpoint & prefix', async () => {
        const route = '/';
        const prefix = 'test';

        const { noSlash, withSlash } = normalizeEndpoint(route, prefix);
        expect(noSlash).toBe('/test');
        expect(withSlash).toBe('/test/');
    });

    it('endpoint; no leading or trailing slashes', async () => {
        const route = 'test/endpoint';

        const { noSlash, withSlash } = normalizeEndpoint(route);
        expect(noSlash).toBe('/test/endpoint');
        expect(withSlash).toBe('/test/endpoint/');
    });

    it('endpoint; leading slash', async () => {
        const route = '/test/endpoint';

        const { noSlash, withSlash } = normalizeEndpoint(route);
        expect(noSlash).toBe('/test/endpoint');
        expect(withSlash).toBe('/test/endpoint/');
    });

    it('endpoint; trailing slash', async () => {
        const route = 'test/endpoint/';

        const { noSlash, withSlash } = normalizeEndpoint(route);
        expect(noSlash).toBe('/test/endpoint');
        expect(withSlash).toBe('/test/endpoint/');
    });

    it('endpoint; leading and trailing slashes', async () => {
        const route = '/test/endpoint/';

        const { noSlash, withSlash } = normalizeEndpoint(route);
        expect(noSlash).toBe('/test/endpoint');
        expect(withSlash).toBe('/test/endpoint/');
    });

    it('endpoint; many slashes', async () => {
        const route = '////test////endpoint////';

        const { noSlash, withSlash } = normalizeEndpoint(route);
        expect(noSlash).toBe('/test/endpoint');
        expect(withSlash).toBe('/test/endpoint/');
    });

    it('prefix & endpoint; leading and trailing slashes', async () => {
        const route = '/test/endpoint/';
        const prefix = '/jhx/';

        const { noSlash, withSlash } = normalizeEndpoint(route, prefix);
        expect(noSlash).toBe('/jhx/test/endpoint');
        expect(withSlash).toBe('/jhx/test/endpoint/');
    });

    it('prefix & endpoint; no leading or trailing slashes', async () => {
        const route = 'test/endpoint';
        const prefix = 'jhx';

        const { noSlash, withSlash } = normalizeEndpoint(route, prefix);
        expect(noSlash).toBe('/jhx/test/endpoint');
        expect(withSlash).toBe('/jhx/test/endpoint/');
    });

    it('prefix & endpoint; leading slash', async () => {
        const route = '/test/endpoint';
        const prefix = '/jhx';

        const { noSlash, withSlash } = normalizeEndpoint(route, prefix);
        expect(noSlash).toBe('/jhx/test/endpoint');
        expect(withSlash).toBe('/jhx/test/endpoint/');
    });

    it('prefix & endpoint; trailing slash', async () => {
        const route = 'test/endpoint/';
        const prefix = 'jhx/';

        const { noSlash, withSlash } = normalizeEndpoint(route, prefix);
        expect(noSlash).toBe('/jhx/test/endpoint');
        expect(withSlash).toBe('/jhx/test/endpoint/');
    });

    it('prefix & endpoint; many slashes', async () => {
        const route = '////test////endpoint////';
        const prefix = '////jhx////';

        const { noSlash, withSlash } = normalizeEndpoint(route, prefix);
        expect(noSlash).toBe('/jhx/test/endpoint');
        expect(withSlash).toBe('/jhx/test/endpoint/');
    });

    it('duplicate prefix; route #1', async () => {
        const route = '/test/endpoint/';
        const prefix = '/test';

        const { noSlash, withSlash } = normalizeEndpoint(route, prefix);
        expect(noSlash).toBe('/test/endpoint');
        expect(withSlash).toBe('/test/endpoint/');
    });

    it('duplicate prefix; route #2', async () => {
        const route = '/test/endpoint/';
        const prefix = 'test';

        const { noSlash, withSlash } = normalizeEndpoint(route, prefix);
        expect(noSlash).toBe('/test/endpoint');
        expect(withSlash).toBe('/test/endpoint/');
    });

    it('duplicate prefix; route #3', async () => {
        const route = 'test/endpoint/';
        const prefix = '/test';

        const { noSlash, withSlash } = normalizeEndpoint(route, prefix);
        expect(noSlash).toBe('/test/endpoint');
        expect(withSlash).toBe('/test/endpoint/');
    });

    it('duplicate prefix; route #4', async () => {
        const route = 'test/endpoint/';
        const prefix = 'test';

        const { noSlash, withSlash } = normalizeEndpoint(route, prefix);
        expect(noSlash).toBe('/test/endpoint');
        expect(withSlash).toBe('/test/endpoint/');
    });
});
