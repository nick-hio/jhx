import { Hono } from 'hono';
import { createJhx } from '@jhxdev/hono';

const app = new Hono();
const { jhx } = createJhx(app, {});

jhx({
    route: 'test',
    handler: () => {
        return '<h1>Hello, Jhx with Hono!</h1>';
    }
})

app.get('/', (c) => c.text('Hono!'));

export default app;