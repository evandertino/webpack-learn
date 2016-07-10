const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Webpack = require("webpack");

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
      pathinfo: !environment.production
        // publicPath: "http://cdn.webpack-learn.dev/assets/[hash]/"
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
          loader: "source-map!eslint",
          // loader: "eslint"
        }
      ],
      loaders: [
        {
          test: /\.json(x)?$/,
          loader: "json"
        },
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
          loader: "pug-html",
          query: {
            pretty: true
          }
        }
      ],
      postLoaders: []
    },
    resolve: {
      extensions: ["", ".js", ".ts", ".tsx", ".pug", ".styl", ".json"]
    },
    plugins: [
      // We can get rid of various test helpers, which is another thing you don’t
      // need in your production build if we tell Webpack to use the production
      // node environment.
      new Webpack.DefinePlugin({
        "process.env": {
          "NODE_ENV": environment.production ? JSON.stringify("production") : JSON.stringify("development")
        }
      }),
      new HtmlWebpackPlugin({
        template: "./index"
      }),
      new Webpack.optimize.UglifyJsPlugin({
        compress: {
          unused: true,
          dead_code: true
        }
      })
    ],
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
      "react": "React",
      "react-dom": "ReactDOM"
    },
    node: {
      fs: "empty",
      module: "empty",
      fsevents: "empty"
    }
  };
};

module.exports = configuration;
