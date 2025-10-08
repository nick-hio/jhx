import path from 'path';
import { config } from '@repo/esbuild-config/config';
import { createBuild } from '@repo/esbuild-config/build';

/** @type {import('esbuild').BuildOptions} */
const esbuildConfig = {
    ...config,
};

(async () => await createBuild(path.join(process.cwd(), 'dist'), esbuildConfig))();
