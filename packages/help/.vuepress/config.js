module.exports = {
  title: 'EC-Nordbund',
  description: 'Hilfe',
  themeConfig: {
    locales: {
      '/': {
        label: 'Deutsch',
        nav: [
          {
            text: 'Hilfe',
            link: '/hilfe/'
          },
          {
            text: 'Generatoren',
            link: '/generatoren/'
          }
        ]
      }
    }
  },
  dest: './dist',
  markdown: {
    lineNumbers: true
  },
  port: 8082
}
