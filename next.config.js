const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')

module.exports = withCSS(
  withSass({
    // cssModules: true,
    webpack: config => {
      // Fixes npm packages that depend on `fs` module
      config.node = {
        fs: 'empty'
      }

      config.module.rules.push({
        test: /\.md$/,
        use: 'frontmatter-markdown-loader'
      })

      return config
    }
  })
)
