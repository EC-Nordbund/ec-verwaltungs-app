module.exports = {
  title: 'EC-Nordbund',
  description: 'Dokumentation',
  themeConfig: {
    locales: {
      '/': {
        label: 'Deutsch',
        nav: [
          {
            text: 'API',
            link: '/api/'
          },
          {
            text: 'APP',
            link: '/app/'
          }
        ]
      }
    }
  },
  dest: './dist',
  markdown: {
    lineNumbers: true
  },
  port: 8081
}
