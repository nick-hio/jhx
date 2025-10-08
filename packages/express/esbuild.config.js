import path from 'path';
import { config } from '@repo/esbuild-config/config';
import { createBuild } from '@repo/esbuild-config/build';

/** @type {import('esbuild').BuildOptions} */
const esbuildConfig = {
    ...config,
    external: [...config.external, 'express'],
};

(async () => await createBuild(path.join(process.cwd(), 'dist'), esbuildConfig))();
