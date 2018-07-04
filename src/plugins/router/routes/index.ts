import { RouteConfig } from 'vue-router'

import RouteComponent from '@/plugins/router/routes/router.vue'
import LoginComponent from '@/Login.vue'
import AppComponent from '@/App.vue'
import HomeComponent from '@/views/Home.vue'
import DruckenComponent from '@/views/Drucken.vue'
import AdminComponent from '@/views/Admin.vue'
import ImpressumComponent from '@/views/Impressum.vue'

import PersonenListe from '@/views/personen/liste.vue'
import PersonenDetails from '@/views/personen/details.vue'

import AKListe from '@/views/arbeitskreise/liste.vue'
import AKDetails from '@/views/arbeitskreise/details.vue'

import VerteilerListe from '@/views/verteiler/liste.vue'
import VerteilerDetails from '@/views/verteiler/details.vue'

import anmeldungListe from '@/views/anmeldungen/liste.vue'
import anmeldungDetails from '@/views/anmeldungen/details.vue'

import unterkünfteListe from '@/views/unterkünfte/liste.vue'
import unterkünfteDetails from '@/views/unterkünfte/details.vue'

import veranstaltungenListe from '@/views/veranstaltungen/liste.vue'
import veranstaltungenDetails from '@/views/veranstaltungen/details.vue'

// Setup Routes
const routes: RouteConfig[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: LoginComponent,
    meta: {
      userGroups: []
    }
  },
  {
    path: '/app',
    component: AppComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        meta: {
          userGroups: '*'
        }
      },
      {
        path: 'personen',
        component: RouteComponent,
        children: [
          {
            path: '',
            component: PersonenListe,
            meta: {
              userGroups: ['admin']
            }
          },
          {
            path: ':id',
            component: PersonenDetails,
            meta: {
              userGroups: ['admin']
            }
          }
        ]
      },
      {
        path: 'arbeitskreise',
        component: RouteComponent,
        children: [
          {
            path: '',
            component: AKListe,
            meta: {
              userGroups: ['admin']
            }
          },
          {
            path: ':id',
            component: AKDetails,
            meta: {
              userGroups: ['admin']
            }
          }
        ]
      },
      {
        path: 'verteiler',
        component: RouteComponent,
        children: [
          {
            path: '',
            component: VerteilerListe,
            meta: {
              userGroups: ['admin']
            }
          },
          {
            path: ':id',
            component: VerteilerDetails,
            meta: {
              userGroups: ['admin']
            }
          }
        ]
      },
      {
        path: 'unterkünfte',
        component: RouteComponent,
        children: [
          {
            path: '',
            component: unterkünfteListe,
            meta: {
              userGroups: ['admin']
            }
          },
          {
            path: ':id',
            component: unterkünfteDetails,
            meta: {
              userGroups: ['admin']
            }
          }
        ]
      },
      {
        path: 'veranstaltungen',
        component: RouteComponent,
        children: [
          {
            path: '',
            component: veranstaltungenListe,
            meta: {
              userGroups: ['admin']
            }
          },
          {
            path: ':id',
            component: veranstaltungenDetails,
            meta: {
              userGroups: ['admin']
            }
          }
        ]
      },
      {
        path: 'anmeldungen',
        component: RouteComponent,
        children: [
          {
            path: '',
            component: anmeldungListe,
            meta: {
              userGroups: ['admin']
            }
          },
          {
            path: ':id',
            component: anmeldungDetails,
            meta: {
              userGroups: ['admin']
            }
          }
        ]
      },
      {
        path: 'admin',
        component: AdminComponent,
        meta: {
          userGroups: ['admin']
        }
      },
      {
        path: 'print',
        component: DruckenComponent,
        meta: {
          userGroups: ['admin']
        }
      },
      {
        path: 'impressum',
        component: ImpressumComponent,
        meta: {
          userGroups: '*'
        }
      }
    ]
  }
]

export default routes
