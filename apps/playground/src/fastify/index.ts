import Fastify from 'fastify';
import { fastifyJhx } from '@jhxdev/fastify'
import { routes } from './routes';

const fastify = Fastify({
    logger: {
        level: "info",
    },
})
fastify.register(fastifyJhx)
fastify.register(routes)

fastify.listen({
    port: 3000,
}, (err) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})
