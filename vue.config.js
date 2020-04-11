module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-marquee-component/'
    : '/',
  configureWebpack: {
    output: {
      libraryExport: 'default'
    }
  },
  css: {
    extract: false,
  }
}
