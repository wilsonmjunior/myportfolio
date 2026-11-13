import {copyFile, mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {build} from 'esbuild';

const source = fileURLToPath(new URL('.', import.meta.url));
const outdir = fileURLToPath(new URL('../dist/motion/', import.meta.url));

await mkdir(outdir, {recursive: true});
await build({
  absWorkingDir: source,
  entryPoints: {hyperframes: 'hyperframes.js', kurio: 'remotion.jsx'},
  bundle: true,
  minify: true,
  outdir,
});
await Promise.all(['hyperframes.html', 'motion.css'].map((name) =>
  copyFile(source + name, outdir + name),
));
