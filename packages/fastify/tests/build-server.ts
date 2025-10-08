import type { FastifyServerOptions } from 'fastify';
import Fastify from 'fastify';

import type { CreateJhxConfig } from '../src';
import { fastifyJhx } from '../src';

export const buildServer = async (
    jhxConfig: CreateJhxConfig = {},
    fastifyOptions: FastifyServerOptions = {},
) => {
    const fastify = Fastify(fastifyOptions);
    await fastify.register(fastifyJhx, {
        ...jhxConfig,
        logger: console,
    });

    fastify.ready((e) => {
        if (e) {
            console.error('FASTIFY ERROR');
            console.error(JSON.stringify(e, null, 2));
            throw e;
        }
    });

    return fastify;
};
