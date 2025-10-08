import { dts } from 'rollup-plugin-dts';

/** @type {import("rollup").RollupOptions} */
export const config = {
    external: [
        'node:*',
    ],
    input: './src/index.ts',
    output: {
        file: 'dist/types/index.d.ts',
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
                outDir: './dist/types',
            },
            exclude: [
                './src/helpers',
                './tests',
            ],
        }),
    ],
};
