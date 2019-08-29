const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')

module.exports = withCSS(
  withSass({
    webpack: config => {
      // Fixes npm packages that depend on `fs` module
      config.node = {
        fs: 'empty'
      }

      config.module.rules.push({
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: [
          { loader: 'elm-webpack-loader', options: { optimize: true } }
        ]
      })

      config.module.rules.push({
        test: /\.md$/,
        use: 'frontmatter-markdown-loader'
      })

      return config
    }
  })
)
