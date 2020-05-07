const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, '_webpack'),
  dest: path.join(__dirname, 'assets'),
};

// https://webpack.js.org/configuration/
module.exports = {
  entry: {
    main: path.join(PATHS.src, 'main'),
  },
  output: {
    path: PATHS.dest,
    filename: '[name]-bundle.js',
  },
  plugins: [
    // https://webpack.js.org/plugins/mini-css-extract-plugin/
    new MiniCssExtractPlugin({
      filename: '[name]-bundle.css',
      chunkFilename: '[id].css',
    }),
    // https://webpack.js.org/plugins/copy-webpack-plugin/
    new CopyPlugin([
      // Copy vendor SVG icons to assets dir
      {
        from: 'node_modules/@fortawesome/fontawesome-free/svgs/regular',
        to: 'images/fontawesome',
        toType: 'dir',
      },
      {
        from: 'node_modules/@fortawesome/fontawesome-free/svgs/solid',
        to: 'images/fontawesome',
        toType: 'dir',
      },
      {
        from: 'node_modules/simple-icons/icons',
        to: 'images/brands',
        toType: 'dir',
        ignore: ['*.js'],
      },
    ]),
    // https://developers.google.com/web/tools/workbox/guides/codelabs/webpack
    // https://developers.google.com/web/tools/workbox/guides/generate-service-worker/webpack
    // https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
    // https://developers.google.com/web/tools/workbox/guides/precache-files
    new WorkboxPlugin.GenerateSW({
      swDest: 'sw.js',
      // Instructs the latest service worker to take control of all clients as soon as it's activated.
      clientsClaim: true,
      // Instructs the latest service worker to activate as soon as it enters the waiting phase.
      skipWaiting: true,
      // Do not precache images.
      exclude: [/\.(?:png|jpg|jpeg|svg)$/],
    }),
  ],
  // https://webpack.js.org/configuration/resolve/
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
    modules: ['node_modules'],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
      }),
    ],
  },
  module: {
    rules: [
      // https://babeljs.io/setup#installation
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // Extracts CSS into separate files
            options: {},
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1, // https://webpack.js.org/loaders/postcss-loader/
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('cssnano')(), // https://cssnano.co/
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {},
          },
        ],
      },
    ],
  },
};
