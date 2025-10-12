import { Elysia } from 'elysia';

import type { CreateJhxConfig } from '../types';
import { createJhx } from './create-jhx';

export const elysiaJhx = (config: CreateJhxConfig = {}) => {
    const app = new Elysia(config.instanceOptions ?? {});

    const { jhx } = createJhx(app, config);
    app.decorate('jhx', jhx);

    return app;
};

export default elysiaJhx;
