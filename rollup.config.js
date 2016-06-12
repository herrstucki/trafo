import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';

let plugins = [
  nodeResolve({
    jsnext: true,
    main: true
  }),
  commonjs({
    include: 'node_modules/**'
  })
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(uglify());
}

export default {
  format: 'umd',
  moduleName: 'Trafo',
  plugins: plugins
};
