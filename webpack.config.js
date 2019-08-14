const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/Tagify.jsx',
  output: {
    path: path.resolve('lib'),
    filename: 'TagifyComponent.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      },
    ],
  },
};
