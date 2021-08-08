const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
    devServer: {
    contentBase: path.join(__dirname, 'dist'),
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
