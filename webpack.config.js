// https://webpack.js.org/configuration/
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    main: path.join(__dirname, '_webpack', 'main'),
  },
  output: {
    filename: 'assets/[name]-bundle.js',
    path: path.resolve(__dirname),
  },
  plugins: [
    // https://webpack.js.org/plugins/mini-css-extract-plugin/
    new MiniCssExtractPlugin({
      filename: 'assets/[name]-bundle.css',
      chunkFilename: '[id].css',
    }),
    // https://webpack.js.org/plugins/copy-webpack-plugin/
    new CopyPlugin([
      // Copy vendor SVG icons to assets dir
      {
        from: 'node_modules/@fortawesome/fontawesome-free/svgs/regular',
        to: 'assets/images/fontawesome',
        toType: 'dir',
      },
      {
        from: 'node_modules/@fortawesome/fontawesome-free/svgs/solid',
        to: 'assets/images/fontawesome',
        toType: 'dir',
      },
      {
        from: 'node_modules/simple-icons/icons',
        to: 'assets/images/brands',
        toType: 'dir',
        ignore: ['*.js'],
      },
    ]),
    // https://developers.google.com/web/tools/workbox/guides/codelabs/webpack
    // https://developers.google.com/web/tools/workbox/guides/generate-service-worker/webpack
    // https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
    // https://developers.google.com/web/tools/workbox/guides/precache-files
    new WorkboxPlugin.GenerateSW(),
  ],
  // https://webpack.js.org/configuration/resolve/
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
    modules: ['node_modules'],
  },
  node: { fs: 'empty' },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({
        // Do not precache images
        exclude: [/\.(?:png|jpg|jpeg|svg)$/],
      }),
    ],
  },
  module: {
    rules: [
      // https://babeljs.io/setup#installation
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '../',
            },
          },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('cssnano')()],
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'assets/images/[name].[ext]',
              limit: 50000,
            },
          },
        ],
      },
    ],
  },
};
