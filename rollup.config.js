import makeConfig from './config/rollup/makeConfig';
import pkg from './package.json';

export default [
  {
    input: "src/index.ts",
    output: [
      { exports: 'named', name: pkg.name, file: 'build/index.js', format: "umd" },
    ],
  }
].map(makeConfig);
