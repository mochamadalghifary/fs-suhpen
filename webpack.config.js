const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = (env, argv) => {
  const devMode = argv.mode === 'development'

  return {
    mode: argv.mode,
    devtool: devMode ? 'inline-source-map' : false,
    devServer: {
      contentBase: './dist',
    },
    entry: './client/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
      chunkFilename: '[id].js',
      publicPath: '',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
      rules: [
        {
          include: path.resolve(__dirname, './client'),
          test: /\.tsx?$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          include: path.resolve(__dirname, './client'),
          test: /\.js$/,
          loader: 'babel-loader',
        },
        {
          test: /\.(png|jpe?g|gif)$/,
          loader: 'url-loader?limit=10000&name=img/[name].[ext]',
        },
        {
          include: path.resolve(__dirname, './client'),
          test: /\.css$/,
          oneOf: [
            // CSS Raw
            {
              resourceQuery: /raw/,
              use: ['style-loader', 'css-loader'],
            },
            // CSS Module
            {
              use: [
                require.resolve('style-loader'),
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 1,
                    modules: {
                      localIdentName: devMode
                        ? '[name]-[local]__[hash:base64:5]'
                        : '[hash:base64:5]',
                      context: './client',
                    },
                    sourceMap: false,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
      new HtmlWebpackPlugin({
        template: __dirname + '/client/index.html',
        filename: 'index.html',
        inject: 'body',
      }),
    ],
  }
}
