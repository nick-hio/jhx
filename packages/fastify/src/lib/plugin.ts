import type { FastifyError } from 'fastify';
import fp from 'fastify-plugin';

import type { JhxError } from 'jhx';

import type { CreateJhxConfig } from '../types';
import { createJhx } from './create-jhx';

export const fastifyJhx = fp<CreateJhxConfig>(
    (fastify, options, done) => {
        try {
            if (fastify.hasDecorator('jhx')) {
                done(new Error('Multiple `jhx` functions cannot decorate the same Fastify instance'));
            }

            const { jhx, JhxComponent } = createJhx(fastify, options);
            fastify.decorate('jhx', jhx);
            fastify.decorate('JhxComponent', JhxComponent);

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
