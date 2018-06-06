module.exports = {
  title: 'EC-Nordbund',
  description: 'Hilfe und Dokumentation',
  themeConfig: {
    repo: 'ecnordbund/ec-verwaltung',
    docsDir: 'docs',
    locales: {
      '/': {
        label: 'Deutsch',
        nav: [
          {
            text: 'Hilfe',
            link: '/hilfe/',
          },
          {
            text: 'API (Für Entwickler)',
            link: '/api/'
          },
          {
            text: 'APP (Für Entwickler)',
            link: '/app/'
          }
        ],
        // sidebar: {
        //   '/hilfe/': [
        //     {
        //       title: 'Hilfe',
        //       collapsable: false,
        //       children: [
        //         '',
        //         'getting-started',
        //         'basic-config',
        //         'assets',
        //         'markdown',
        //         'using-vue',
        //         'custom-themes',
        //         'i18n',
        //         'deploy'
        //       ]
        //     }
        //   ]
        // }
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