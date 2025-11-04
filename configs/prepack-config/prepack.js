import path from 'path';

(async () => {
    try {
        const /** @type {object} */ packageJson = await Bun.file(path.join(process.cwd(), 'package.json')).json();
        let jhxVersion = null;

        if (!packageJson || typeof packageJson !== 'object') {
            throw new Error(`No valid 'jhx/package.json' found.`);
        }

        if (packageJson.dependencies && 'jhx' in packageJson.dependencies) {
            const /** @type {object} */ jhxPackageJson = await Bun.file(path.join(process.cwd(), '../jhx/package.json')).json();

            if (!jhxPackageJson || typeof jhxPackageJson !== 'object') {
                throw new Error(`No 'package.json' found for 'jhx'.`);
            }
            if (!jhxPackageJson.version) {
                throw new Error(`No version found for 'jhx'.`);
            }

            jhxVersion = jhxPackageJson.version;
            packageJson.dependencies['jhx'] = `^${jhxVersion}`;
        }

        const newPackageJson = {
            name: packageJson.name,
            description: packageJson.description,
            version: packageJson.version,
            author: packageJson.author,
            homepage: packageJson.homepage,
            repository: packageJson.repository,
            keywords: packageJson.keywords,
            files: [
                'README.md',
                'index.js',
                'index.cjs',
                'index.d.ts',
            ],
            dependencies: packageJson.dependencies,
            peerDependencies: packageJson.peerDependencies,
            type: 'module',
            module: './index.js',
            main: './index.cjs',
            types: './index.d.ts',
            exports: {
                '.': {
                    import: {
                        default: './index.js',
                        types: './index.d.ts',
                    },
                    require: {
                        default: './index.cjs',
                        types: './index.d.ts',
                    },
                },
            },
        }

        await Bun.write(path.join(process.cwd(), 'dist', 'package.json'), JSON.stringify(newPackageJson, null, 2));

        if (jhxVersion) {
          console.log(`✅  Created 'dist/package.json' (with jhx@${jhxVersion}).\n`);
        } else {
          console.log(`✅  Created 'dist/package.json'.\n`);
        }
    } catch (e) {
        console.error(`❌  Prepack failed:`);
        console.error(e);
        process.exit(1);
    }
})();
