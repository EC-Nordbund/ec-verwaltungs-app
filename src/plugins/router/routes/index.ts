import { RouteConfig } from 'vue-router'

const RouteComponent = () => import(/* webpackChunkName: "router-view-wrapper" */'@/plugins/router/routes/router.vue')

const LoginComponent = () => import(/* webpackChunkName: "root-login" */'@/Login.vue')
const AppComponent = () => import(/* webpackChunkName: "root-app" */'@/App.vue')

const HomeComponent = () => import(/* webpackChunkName: "root-app-Home" */'@/views/Home.vue')
const DruckenComponent = () => import(/* webpackChunkName: "root-app-Drucken" */'@/views/Drucken.vue')
const HelpComponent = () => import(/* webpackChunkName: "root-app-help" */'@/views/Help.vue')
const AdminComponent = () => import(/* webpackChunkName: "root-app-admin" */'@/views/Admin.vue')
const ImpressumComponent = () => import(/* webpackChunkName: "root-app-impressum" */'@/views/Impressum.vue')

const PersonenListe = () => import(/* webpackChunkName: "root-app-personen-liste" */'@/views/personen/liste.vue')
const PersonenDetails = () => import(/* webpackChunkName: "root-app-personen-details" */'@/views/personen/details.vue')


const AKListe = () => import(/* webpackChunkName: "root-app-ak-liste" */'@/views/arbeitskreise/liste.vue')
const AKDetails = () => import(/* webpackChunkName: "root-app-ak-details" */'@/views/arbeitskreise/details.vue')

const VerteilerListe = () => import(/* webpackChunkName: "root-app-verteiler-liste" */'@/views/verteiler/liste.vue')
const VerteilerDetails = () => import(/* webpackChunkName: "root-app-verteiler-details" */'@/views/verteiler/details.vue')

const anmeldungListe = () => import(/* webpackChunkName: "root-app-anmeldung-liste" */'@/views/anmeldungen/liste.vue')
const anmeldungDetails = () => import(/* webpackChunkName: "root-app-anmeldung-details" */'@/views/anmeldungen/details.vue')

const unterkünfteListe = () => import(/* webpackChunkName: "root-app-unterkünfte-liste" */'@/views/unterkünfte/liste.vue')
const unterkünfteDetails = () => import(/* webpackChunkName: "root-app-unterkünfte-details" */'@/views/unterkünfte/details.vue')

const veranstaltungenListe = () => import(/* webpackChunkName: "root-app-veranstaltungen-liste" */'@/views/veranstaltungen/liste.vue')
const veranstaltungenDetails = () => import(/* webpackChunkName: "root-app-veranstaltungen-details" */'@/views/veranstaltungen/details.vue')

// Setup Routes
const routes: Array<RouteConfig> = [
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
        component: HomeComponent
      },
      {
        path: 'personen',
        component: RouteComponent,
        children: [
          {
            path: '',
            component: PersonenListe
          },
          {
            path: ':id',
            component: PersonenDetails
          }
        ]
      },
      {
        path: 'arbeitskreise',
        component: RouteComponent,
        children: [
          {
            path: '',
            component: AKListe
          },
          {
            path: ':id',
            component: AKDetails
          }
        ]
      },
      {
        path: 'verteiler',
        component: RouteComponent,
        children: [
          {
            path: '',
            component: VerteilerListe
          },
          {
            path: ':id',
            component: VerteilerDetails
          }
        ]
      },
      {
        path: 'unterkünfte',
        component: RouteComponent,
        children: [
          {
            path: '',
            component: unterkünfteListe
          },
          {
            path: ':id',
            component: unterkünfteDetails
          }
        ]
      },
      {
        path: 'veranstaltungen',
        component: RouteComponent,
        children: [
          {
            path: '',
            component: veranstaltungenListe
          },
          {
            path: ':id',
            component: veranstaltungenDetails
          }
        ]
      },
      {
        path: 'anmeldungen',
        component: RouteComponent,
        children: [
          {
            path: '',
            component: anmeldungListe
          },
          {
            path: ':id',
            component: anmeldungDetails
          }
        ]
      },
      {
        path: 'admin',
        component: AdminComponent
      }, 
      {
        path: 'print',
        component: DruckenComponent
      }, 
      {
        path: 'impressum',
        component: ImpressumComponent
      }
    ]
  },
  {
    path: '/help',
    component: HelpComponent
  }
]

export default routes