import fp from 'fastify-plugin'
import { fastifyStatic } from '@fastify/static'
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default fp(async (fastify) => {
    fastify.register(fastifyStatic, {
        root: join(__dirname, '../..', 'public'),
        prefix: '/public/',
    })
})
