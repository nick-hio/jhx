import path from 'path';
import { readdir, copyFile } from "node:fs/promises";

const /** @type {(packageJson: object) => object} */ newPackageJson = (packageJson) => {
    return {
        name: packageJson.name,
        description: packageJson.description,
        version: packageJson.version,
        author: packageJson.author,
        homepage: packageJson.homepage,
        repository: packageJson.repository,
        license: 'MIT',
        keywords: packageJson.keywords,
        files: [
            'README.md',
            'LICENSE',
            'index.js',
            'index.cjs',
            'index.d.ts',
        ],
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
        dependencies: packageJson.dependencies,
        peerDependencies: packageJson.peerDependencies,
        devDependencies: Object.fromEntries(
            Object.entries(packageJson.devDependencies ?? {})
              .filter(([_key, value]) => value !== 'workspace:*'),
        ),
    }
}

(async () => {
    try {
        const cwd = path.normalize(process.cwd());

        const files = await readdir(cwd);
        if (!files.includes('package.json') || !files.includes('README.md')) {
            throw new Error(`No 'package.json' or 'README.md' found in '${cwd}'.`);
        }

        const /** @type {object} */ packageJson = await Bun.file(path.join(cwd, 'package.json')).json();
        if (!packageJson || typeof packageJson !== 'object') {
            throw new Error(`Invalid 'package.json'.`);
        }

        let jhxVersion = null;

        if (packageJson.dependencies && 'jhx' in packageJson.dependencies) {
            const /** @type {object} */ jhxPackageJson = await Bun.file(path.join(cwd, '../jhx/package.json')).json();

            if (!jhxPackageJson || typeof jhxPackageJson !== 'object') {
                throw new Error(`No 'package.json' found for 'jhx'.`);
            }
            if (!jhxPackageJson.version) {
                throw new Error(`No version found for 'jhx'.`);
            }

            jhxVersion = jhxPackageJson.version;
            packageJson.dependencies['jhx'] = `^${jhxVersion}`;
        }

        const dir = cwd.split(path.sep).pop();

        const /** @type {string} */ readme = await Bun.file(path.join(cwd, 'README.md')).text();
        const /** @type {string} */ newReadme = readme
          .split(/\r?\n/)
          .filter(line => !/^\s*>\s*\[!NOTE\]\s*$/.test(line))
          .join('\n');

        await Bun.write(path.join(cwd, 'dist', 'README.md'), newReadme);
        console.log(`✅  Created '${dir}/dist/README.md'.`);

        await copyFile(path.join(cwd, '../..', 'LICENSE'), path.join(cwd, 'dist', 'LICENSE'));
        console.log(`✅  Created '${dir}/dist/LICENSE'.`);

        await Bun.write(path.join(cwd, 'dist', 'package.json'), JSON.stringify(newPackageJson(packageJson), null, 2));
        if (jhxVersion) {
          console.log(`✅  Created '${dir}/dist/package.json' (with jhx@${jhxVersion}).\n`);
        } else {
          console.log(`✅  Created '${dir}/dist/package.json'.\n`);
        }
    } catch (e) {
        console.error(`❌  Prepack failed:`);
        console.error(e);
        process.exit(1);
    }
})();
