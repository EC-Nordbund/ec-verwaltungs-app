import { theme } from '@/plugins/design/theme'
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

// Install Plugin
Vue.use(Vuetify, {
  theme: theme,
  lang: {
    locales: {
      de: {
        dataIterator: {
          rowsPerPageText: 'Datensätze pro Seite:',
          rowsPerPageAll: 'Alle',
          pageText: 'Datensätze {0} - {1} von {2}',
          noResultsText:
            'Keine passenden Datensätze gefunden.',
          nextPage: 'Nächste Seite',
          prevPage: 'Vorherige Seite'
        },
        dataTable: {
          rowsPerPageText: 'Datensätze pro Seite:'
        },
        noDataText: 'Keine Daten verfügbar '
      }
    },
    current: 'de'
  }
})
