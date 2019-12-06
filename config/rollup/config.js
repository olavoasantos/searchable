import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import cleanup from 'rollup-plugin-cleanup';
import pkg from '../../package.json';

export default {
  external: Object.keys(pkg.peerDependencies || {}),
  plugins: [
    resolve(),
    typescript({
      clean: true,
      exclude: ['*.d.ts', '**/*.d.ts', '*.test.ts', '**/*.test.ts'],
      rollupCommonJSResolveHack: true,
      tsconfig: 'tsconfig.json',
      useTsconfigDeclarationDir: true,
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
    }),
    minify(),
    cleanup({
      comments: 'none',
    }),
  ],
};
