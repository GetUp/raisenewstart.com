const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')

module.exports = withCSS(
  withSass({
    env: {
      apiHost: process.env.FRAUDSTOP_API_HOST
    },
    webpack: config => {

      // Fixes npm packages that depend on `fs` module
      config.node = {
        fs: 'empty'
      }

      config.module.rules.push({
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: [{ loader: 'elm-webpack-loader', options: { optimize: false } }]
      })

      config.module.rules.push({
        test: /\.md$/,
        use: 'frontmatter-markdown-loader'
      })

      config.module.rules.push({
        test: /\.svg$/,
        use: [
          'babel-loader',
          {
            loader: 'react-svg-loader',
            options: {
              svgo: {
                plugins: [{ removeTitle: false }],
                floatPrecision: 2
              }
            }
          }
        ]
      })

      return config
    }
  })
)
