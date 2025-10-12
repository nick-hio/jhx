import path from 'path';
import { createBuild } from '@repo/esbuild-config/build';
import { config } from '@repo/esbuild-config/config';

/** @type {import('esbuild').BuildOptions} */
const esbuildConfig = {
    ...config,
    external: [...config.external, 'fastify'],
};

(async () => await createBuild(path.join(process.cwd(), 'dist'), esbuildConfig))();
