import { theme } from '@/config/theme';
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

export default {
  install(vue: typeof Vue) {
    vue.use(Vuetify, {
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
  }
}
