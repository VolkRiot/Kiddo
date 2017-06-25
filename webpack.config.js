const path              = require('path'),
      webpack           = require('webpack'),
      HtmlWebpackPlugin = require('html-webpack-plugin');

let config = {
  entry: './src/client/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      {test: /\.css$/, use: [ 'style-loader','css-loader' ]}
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },
    devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  plugins: [
      new HtmlWebpackPlugin({template: 'src/client/index.html'}),
  ]
};


if(process.env.NODE_ENV === 'production'){
  config.plugins.push(
     new webpack.DefinePlugin({
       'process.env': {
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }
     }),
      new webpack.optimize.UglifyJsPlugin()
  )
}


module.exports = config;