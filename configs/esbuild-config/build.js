import { build } from 'esbuild';
import { config } from './config';

/**
 * @param {string} distDir
 * @param {import('esbuild').BuildOptions} esBuildConfig
 */
export const createBuild = async (distDir, esBuildConfig = config) => {
    try {
        console.log('Building CJS module...');
        const cjsBuild = await build({
            ...esBuildConfig,
            format: 'cjs',
            outdir: distDir,
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
            ...esBuildConfig,
            format: 'esm',
            outdir: distDir,
        });
        if (esmBuild.warnings.length) {
            console.warn('⚠️  ESM build completed with warnings:');
            esmBuild.warnings.forEach((warning) => {
                console.warn(`  - ${warning.location.file} (line ${warning.location.line}): ${warning.text}`);
            });
        }
    } catch (e) {
        console.error('❌  Build failed:');
        console.error(JSON.stringify(e, null, 2));
    }
}
