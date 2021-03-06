import { resolve } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { Configuration } from 'webpack'

const config = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    index: resolve(__dirname, '../packages/preview/index.ts'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            onlyCompileBundledFiles: true,
          },
        },
      },
      {
        test: /\.(vert|frag|glsl)$/,
        type: 'asset/source',
      },
      {
        test: /\.(png|jpg)$/,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '../packages/preview/index.html'),
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
} as Configuration

export default config
