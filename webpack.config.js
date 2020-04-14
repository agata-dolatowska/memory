const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  devServer: {
        contentBase: './dist',
       },
  module:{
      rules:[
          {
              test: /\.css$/,
              use: [
                  'style-loader',
                  'css-loader',
                  'sass-loader'
              ],
          },
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
      ],
  },
  plugins: [
    new CleanWebpackPlugin(),
       new HtmlWebpackPlugin({
         title: 'memory',
       }),
     ],
};