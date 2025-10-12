import type { FastifyError } from 'fastify';
import fp from 'fastify-plugin';

import type { JhxError } from 'jhx';

import type { CreateJhxConfig } from '../types';
import { createJhx } from './create-jhx';

/**
 * Fastify plugin that adds JHX (JSX + HTMX) functionality to Fastify.
 *
 * Creates and adds a `jhx` function which will generate server routes for HTMX interactions
 * and returns an object containing HTMX and HTML attributes that can be applied to DOM elements.
 */
export const fastifyJhx = fp<CreateJhxConfig>(
    (fastify, options, done) => {
        try {
            const { jhx } = createJhx(fastify, options);

            if (fastify.hasDecorator('jhx')) {
                done(
                    new Error(
                        'Multiple `jhx` functions cannot be instantiated with the same Fastify instance',
                    ),
                );
            }

            fastify.decorate('jhx', jhx);
            done();
        } catch (e) {
            done(e as Error | JhxError | FastifyError);
        }
    },
    {
        fastify: '5.x',
        name: 'fastifyJhx',
    },
);

export default fastifyJhx;
