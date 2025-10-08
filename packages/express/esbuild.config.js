import path from 'path';
import { config } from '@repo/esbuild-config/base';
import { build } from 'esbuild';

/** @type {import('esbuild').BuildOptions} */
const esbuildConfig = {
    ...config,
    external: [...config.external, 'express'],
};

const esbuild = async () => {
    const projectDir = process.cwd();

    console.log('Building CJS module...');
    const cjsBuild = await build({
        ...esbuildConfig,
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

    console.log('\nBuilding ESM module...');
    const esmBuild = await build({
        ...esbuildConfig,
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
