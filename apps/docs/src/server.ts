import Fastify from 'fastify';
import AutoLoad from '@fastify/autoload';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fastify = Fastify({ logger: true });

// fastify.register(AutoLoad, {
//     dir: join(__dirname, 'plugins'),
// });
fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
});

fastify.listen({ port: 3000 })
