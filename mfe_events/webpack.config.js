
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
//  module federation and webpack plugin is done here 

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  mode: 'production',
  output: { publicPath: 'auto' },
  resolve: { extensions: ['.js', '.jsx'] },
  module: { rules: [{ test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ }, {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      }] },
  plugins: [
    new ModuleFederationPlugin({
      name: 'mfe_events',
      filename: 'remoteEntry.js',
      exposes: { './EventApp': './src/App.jsx', './EventSummary': './src/components/EventSummary.jsx'  },
      remotes: {
    base_app: 'base_app@https://microservi.netlify.app/remoteEntry.js'   
  },
      
      shared: { react: { singleton:true, requiredVersion:false }, 'react-dom': { singleton:true, requiredVersion:false }, 'react-redux': { singleton:true, requiredVersion:false }, '@reduxjs/toolkit': { singleton:true, requiredVersion:false } }
    }),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') })
    
  ]
};
