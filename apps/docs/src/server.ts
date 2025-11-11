import Fastify from 'fastify';
import AutoLoad from '@fastify/autoload';
import { join } from 'path';


const fastify = Fastify({ logger: true })

fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
})
fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
})

fastify.listen({ port: 3000 })
