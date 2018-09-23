import { RouteConfig } from 'vue-router'

import RouteComponent from '@/plugins/router/routes/router.vue'

import LoginComponent from '@/Login.vue'
import AppComponent from '@/App.vue'

import HomeComponent from '@/views/Home.vue'
import DruckenComponent from '@/views/Drucken.vue'
import AdminComponent from '@/views/Admin.vue'
import ImpressumComponent from '@/views/Impressum.vue'
import ProfilComponent from '@/views/Profil.vue'

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
        component: RouteComponent,
        children: [
          {
            path: '',
            component: HomeComponent,
            meta: {
              userGroups: '*'
            }
          }
        ]
      },
      {
        path: 'personen',
        component: RouteComponent,
        children: [
          {
            path: '',
            component: PersonenListe,
            meta: {
              userGroups: ['admin', 'vorsitzender']
            }
          },
          {
            path: ':id',
            component: PersonenDetails,
            meta: {
              userGroups: ['admin', 'vorsitzender']
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
              userGroups: ['admin', 'vorsitzender']
            }
          },
          {
            path: ':id',
            component: AKDetails,
            meta: {
              userGroups: ['admin', 'vorsitzender']
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
        path: 'organisationen',
        component: RouteComponent,
        children: [
          {
            path: '',
            component: unterkünfteListe,
            meta: {
              userGroups: [
                'admin',
                'anmeldeverwaltung',
                'kasse',
                'veranstaltungsverwaltung',
                'veranstaltungsleiter'
              ]
            }
          },
          {
            path: ':id',
            component: unterkünfteDetails,
            meta: {
              userGroups: [
                'admin',
                'anmeldeverwaltung',
                'kasse',
                'veranstaltungsverwaltung',
                'veranstaltungsleiter'
              ]
            }
          }
        ]
      },
      {
        path: 'vorte',
        component: RouteComponent,
        children: [
          {
            path: '',
            component: unterkünfteListe,
            meta: {
              userGroups: [
                'admin',
                'anmeldeverwaltung',
                'kasse',
                'veranstaltungsverwaltung',
                'veranstaltungsleiter'
              ]
            }
          },
          {
            path: ':id',
            component: unterkünfteDetails,
            meta: {
              userGroups: [
                'admin',
                'anmeldeverwaltung',
                'kasse',
                'veranstaltungsverwaltung',
                'veranstaltungsleiter'
              ]
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
              userGroups: [
                'admin',
                'anmeldeverwaltung',
                'kasse',
                'veranstaltungsverwaltung',
                'veranstaltungsleiter'
              ]
            }
          },
          {
            path: ':id',
            component: veranstaltungenDetails,
            meta: {
              userGroups: [
                'admin',
                'anmeldeverwaltung',
                'kasse',
                'veranstaltungsverwaltung',
                'veranstaltungsleiter'
              ]
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
              userGroups: [
                'admin',
                'anmeldeverwaltung',
                'kasse',
                'veranstaltungsverwaltung',
                'veranstaltungsleiter'
              ]
            }
          },
          {
            path: ':id',
            component: anmeldungDetails,
            meta: {
              userGroups: [
                'admin',
                'anmeldeverwaltung',
                'kasse',
                'veranstaltungsverwaltung',
                'veranstaltungsleiter'
              ]
            }
          }
        ]
      },
      {
        path: 'admin',
        component: RouteComponent,
        children: [
          {
            path: '',
            component: AdminComponent,
            meta: {
              userGroups: ['admin']
            }
          }
        ]
      },
      {
        path: 'profil',
        component: RouteComponent,
        children: [
          {
            path: '',
            // component: ProfilComponent,
            meta: {
              userGroups: '*'
            }
          }
        ]
      },
      {
        path: 'print',
        component: RouteComponent,
        children: [
          {
            path: '',
            component: DruckenComponent,
            meta: {
              userGroups: ['admin', 'anmeldeverwaltung']
            }
          }
        ]
      },
      {
        path: 'impressum',
        component: RouteComponent,
        children: [
          {
            path: '',
            component: ImpressumComponent,
            meta: {
              userGroups: '*'
            }
          }
        ]
      }
    ]
  }
]

export default routes
