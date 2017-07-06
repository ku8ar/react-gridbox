module.exports = {
  plugins: [
    // your custom plugins
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          query: {
            cacheDirectory: true,
            plugins: [
              'babel-plugin-transform-class-properties',
              'babel-plugin-syntax-dynamic-import',
              [
                'babel-plugin-transform-runtime',
                {
                  helpers: true,
                  polyfill: false, // we polyfill needed features in src/normalize.js
                  regenerator: true,
                },
              ],
              [
                'babel-plugin-transform-object-rest-spread',
                {
                  useBuiltIns: true // we polyfill Object.assign in src/normalize.js
                },
              ],
              'transform-decorators-legacy'
            ],
            presets: [
              'babel-preset-react',
              ['babel-preset-env', {
                modules: false,
                targets: {
                  ie9: true,
                },
                uglify: true,
              }],
            ]
          },
        }],
      },
      {
        test: /\.(sass|scss)$/,
        loader: ['style-loader', 'css-loader', 'sass-loader']
      }
    ],
  },
};
