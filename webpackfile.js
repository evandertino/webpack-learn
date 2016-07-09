const { resolve } = require("path");

const configuration = environment => {
  console.log("active environment ", environment);
  console.log("environment is production ", !!environment.production);
  console.log("environment is testing ", !!environment.testing);
  console.log("environment is development ", !!environment.development);

  return {
    entry: "./Main",
    // entry: {
    //   app: "./Main"
    // },
    output: {
      // filename: "[name].[hash].bundle.js",
      filename: "bundle.js",
      // path: resolve(__dirname, "dist", "assets", "[hash]"),
      path: resolve(__dirname, "dist"),
      pathinfo: !environment.production,
      publicPath: "http://cdn.webpack-learn.dev/assets/[hash]/"
    },
    context: resolve(__dirname, "src"),
    bail: environment.production,
    devtool: "source-map", // environment.production ? "source-map" : "eval-source-map",
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
          // loader: "source-map!eslint",
          loader: "eslint"
        }
      ],
      loaders: [
        {
          test: /\.ts(x)?$/,
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
        },
        {
          test: /\.pug$/,
          exclude: /(node_modules)/,
          loader: "pug-html"
        }
      ],
      postLoaders: []
    },
    resolve: {
      extensions: ["", ".js", ".ts", ".tsx", ".pug", ".styl"]
    },
    plugins: [],
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
      "react": "React",
      "react-dom": "ReactDOM"
    }
  };
};

module.exports = configuration;
