import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from '@repo/rollup-config/base';
import alias from '@rollup/plugin-alias';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type { import("rollup").RollupOptions } */
export default {
    ...config,
    external: [...config.external, 'elysia'],
    plugins: [
        ...config.plugins,
        alias({
            entries: [
                {
                    find: '@jhxdev/server',
                    replacement: path.resolve(__dirname, '../server/src'),
                },
            ],
        }),
    ],
};
