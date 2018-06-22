module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'erbaoadmin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '亿贝新后台' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#409EFF'},
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      'axios',
      'element-ui',
      'babel-polyfill'
    ],
    babel: {
      presets: ['es2015', 'stage-0'],
      plugins: ['transform-runtime', 'transform-decorators-legacy']
    },
    extend (config, { isDev, isClient }) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/
      })
    }
  },
 plugins: [
   {src: '~plugins/element.js', ssr: true}
 ],
 css: [
  'element-ui/lib/theme-chalk/reset.css',
  'element-ui/lib/theme-chalk/index.css',
  {src: '~assets/styles/element_ui_extend.less', lang: 'less'}
  ],
  router: {
    middleware: ['auth', 'error']
  }  
}
