import Fastify from 'fastify';
import AutoLoad from '@fastify/autoload';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

let dirName;
// @ts-ignore: `__dirname` ESM fix
if (process.env.NODE_ENV === 'development' || typeof __dirname === 'undefined') {
    dirName = dirname(fileURLToPath(import.meta.url));
} else {
    dirName = __dirname;
}

const fastify = Fastify({ logger: true });

fastify.register(AutoLoad, {
    dir: join(dirName, 'plugins'),
});
fastify.register(AutoLoad, {
    dir: join(dirName, 'routes'),
});

fastify.listen({ port: 3000 })
