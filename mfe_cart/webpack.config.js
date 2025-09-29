const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
//   mode: 'production',
  devServer: {
    port: 3005,  // NEW PORT for Cart MFE
    historyApiFallback: true
  },
  output: { publicPath: 'auto' },
  resolve: { extensions: ['.js', '.jsx'] },
  module: { 
    rules: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/i, use: ["style-loader", "css-loader"] }
    ] 
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'mfe_cart',
      filename: 'remoteEntry.js',
      exposes: { 
        './CartApp': './src/App.jsx',
        './CartManager': './src/components/CartManager.jsx'  // NEW: For full cart management
      },
      remotes: {
        base_app: 'base_app@https://microservi.netlify.app/remoteEntry.js'
      },
      shared: { 
        react: { singleton: true }, 
        'react-dom': { singleton: true },
        'react-redux': { singleton: true },
        '@reduxjs/toolkit': { singleton: true }
      }
    }),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') })
  ]
};