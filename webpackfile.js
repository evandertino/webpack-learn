const { resolve } = require("path");

const configuration = environment => {
  console.log("active environment ", environment);
  console.log("environment is production ", !!environment.production);
  console.log("environment is testing ", !!environment.testing);
  console.log("environment is development ", !!environment.development);

  return {
    entry: {
      app: "./main"
    },
    output: {
      filename: "[name].[hash].bundle.js",
      path: resolve(__dirname, "dist", "assets", "[hash]"),
      pathinfo: !environment.production,
      publicPath: "http://cdn.webpack-learn.dev/assets/[hash]/"
    },
    context: resolve(__dirname, "src"),
    bail: environment.production,
    devtool: environment.production ? "source-map" : "eval-source-map",
    module: {
      preLoaders: [
        {
          test: /\.ts(x?)$/,
          exclude: /(node_modules)/,
          loader: "tslint"
        },
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: "eslint"
        }
      ],
      loaders: [
        {
          test: /\.ts(x?)$/,
          exclude: /(node_modules)/,
          loader: "ts"
        },
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: "babel",
          query: {
            presets: ["es2015-webpack"]
          }
        }
      ],
      postLoaders: []
    },
    resolve: {
      extensions: ["", ".js", ".ts", ".tsx", ".pug", ".styl"]
    },
    plugins: []
  };
};

module.exports = configuration;
