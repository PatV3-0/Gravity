const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        use: ['style-loader', 'css-loader', 'postcss-loader'], // Include postcss-loader
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'images/',
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
