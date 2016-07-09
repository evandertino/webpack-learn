const { resolve } = require('path');

const configuration = environment => {
  console.log('active environment ', environment);
  console.log('environment is production', !!environment.production);
  console.log('environment is testing', !!environment.testing);
  console.log('environment is development', !!environment.development);

  return {
    entry: {
      app: './main'
    },
    output: {
      filename: '[name].[chunkhash].bundle.js',
      path: resolve(__dirname, 'dist', 'assets', '[hash]'),
      pathinfo: !environment.production,
      publicPath: 'http://cdn.webpack-learn.dev/assets/[hash]/'
    },
    context: resolve(__dirname, 'src'),
    module: {
      preLoaders: [],
      loaders: [],
      postLoaders: []
    },
    resolve: {
      extensions: ['', '.js', '.ts', '.pug', '.styl']
    },
    plugins: []
  };
};

module.exports = configuration;
