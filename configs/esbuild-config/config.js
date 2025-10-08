/** @type {import('esbuild').BuildOptions} */
export const config = {
    bundle: true,
    entryPoints: ['src/index.ts'],
    external: [
        'node:*',
    ],
    jsx: 'preserve',
    keepNames: true,
    logLevel: 'info',
    minify: true,
    packages: 'bundle',
    platform: 'node',
    sourcemap: false,
    splitting: false,
    treeShaking: true,
    tsconfig: 'tsconfig.json',
    conditions: ['source', 'default'],
};
