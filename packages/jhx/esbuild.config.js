import path from 'path';
import { build } from 'esbuild';

/** @type {import('esbuild').BuildOptions} */
const config = {
    bundle: true,
    entryPoints: ['src/index.ts'],
    external: ['htmx.org', 'react', 'react/jsx-runtime', 'react-dom', 'node:*'],
    jsx: 'transform',
    keepNames: true,
    logLevel: 'info',
    minify: true,
    packages: 'bundle',
    platform: 'node',
    sourcemap: false,
    splitting: false,
    treeShaking: true,
    tsconfig: 'tsconfig.json',
};

const esbuild = async () => {
    const projectDir = process.cwd();

    // CJS

    console.log('Building CJS module...');
    const cjsBuild = await build({
        ...config,
        format: 'cjs',
        outdir: path.join(projectDir, 'dist', 'cjs'),
        outExtension: { '.js': '.cjs' },
    });
    if (cjsBuild.warnings.length) {
        console.warn('⚠️  CJS build completed with warnings:');
        cjsBuild.warnings.forEach((warning) => {
            console.warn(`  - ${warning.location.file} (line ${warning.location.line}): ${warning.text}`);
        });
    }

    // ESM

    console.log('\nBuilding ESM module...');
    const esmBuild = await build({
        ...config,
        format: 'esm',
        outdir: path.join(projectDir, 'dist', 'mjs'),
        outExtension: { '.js': '.mjs' },
    });
    if (esmBuild.warnings.length) {
        console.warn('⚠️  ESM build completed with warnings:');
        esmBuild.warnings.forEach((warning) => {
            console.warn(`  - ${warning.location.file} (line ${warning.location.line}): ${warning.text}`);
        });
    }
};

esbuild().catch((error) => {
    console.error('❌  Build failed:');
    console.error(error);
});
