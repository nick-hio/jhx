import { dts } from 'rollup-plugin-dts';

/** @type {import("rollup").RollupOptions} */
export const config = {
    external: [
        'http',
        'node:stream',
    ],
    input: './src/index.ts',
    output: {
        file: 'dist/index.d.ts',
        format: 'es',
    },
    plugins: [
        dts({
            tsconfig: './tsconfig.json',
            compilerOptions: {
                noEmit: false,
                emitDeclarationOnly: true,
                declaration: true,
                declarationMap: false,
                outDir: './dist',
            },
            exclude: [
                './src/helpers',
                './tests',
            ],
        }),
    ],
};
