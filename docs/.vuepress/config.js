module.exports = {
  title: 'EC-Nordbund',
  description: 'Hilfe und Dokumentation',
  themeConfig: {
    repo: 'ecnordbund/ec-verwaltungs-app',
    docsDir: 'docs',
    locales: {
      '/': {
        label: 'Deutsch',
        nav: [
          {
            text: 'Hilfe',
            link: '/hilfe/'
          },
          {
            text: 'API (Für Entwickler)',
            link: '/api/'
          },
          {
            text: 'APP (Für Entwickler)',
            link: '/app/'
          }
        ]
      }
    }
  },
  base: './',
  dest: './electron/src/docs',
  markdown: {
    lineNumbers: true
  },
  port: 8081
}
