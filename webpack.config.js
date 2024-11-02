const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './frontend/src/index.js',
  output: {
    path: path.resolve(__dirname, 'frontend', 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]', // Keep the original name and add hash for cache-busting
              outputPath: 'images/', // Images will be output here
              publicPath: 'images/', // URL path for serving images
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './frontend/public/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, 'frontend', 'public', 'assets', 'icon', 'favicon-96x96.png'),
      prefix: 'assets/favicon/',
      mode: 'webapp',
      devMode: 'webapp',
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'frontend', 'public'),
    },
    port: 3000,
    hot: true,
    open: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};