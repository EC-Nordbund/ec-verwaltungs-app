import AppComponent from '@/views/App.vue';
import dashboardComponent from '@/views/dashboard/view.vue';
import err401 from '@/views/fehler/401.vue';
import err404 from '@/views/fehler/404.vue';
import err500 from '@/views/fehler/500.vue';
import LoginComponent from '@/views/Login.vue';
import orgaDetails from '@/views/organisationen/details.vue';
import orgaDetailsAllgemein from '@/views/organisationen/details/allgemein.vue';
import orgaDetailsVeranstaltungen from '@/views/organisationen/details/veranstaltungen.vue';
import orgaDetailsVeranstaltungsorte from '@/views/organisationen/details/veranstaltungsorte.vue';
import orgaList from '@/views/organisationen/liste.vue';
import veranstaltungsortComponent from '@/views/veranstaltungsorte/liste.vue'
import routeComponent from '@/config/router.vue';
import veranstaltungsortDetails from '@/views/veranstaltungsorte/details.vue'
import veranstaltungsortAllgemeinDetails from '@/views/veranstaltungsorte/details/allgemein.vue'
import veranstaltungsortKontaktDetails from '@/views/veranstaltungsorte/details/kontakt.vue'
import veranstaltungsortVeranstaltungenDetails from '@/views/veranstaltungsorte/details/veranstaltungen.vue'
import singlePage from '@/views/dashboard/singlePage.vue';
import impressumComponent from "@/views/sonstiges/Impressum.vue";
import { RouteConfig } from 'vue-router';

const notFound:RouteConfig = {
  path: '*', 
  redirect: to => (
    {
      path: '/404',
      query: {
        prev: to.fullPath
      }
    }
  )
}

const routes: RouteConfig[] = [
  {path: "/login", component: LoginComponent},
  {path: "/", component: AppComponent, children: [
    {path: '', redirect: 'dashboard'},
    {path: 'dashboard', component: routeComponent, children:[
      {path: '', redirect: '0'},
      {path:':id',component:dashboardComponent, children:[
        {path: '', component: singlePage},
        // {path: 'settings', component: dashboardComponent},
        notFound
      ]},
      // {path: 'settings', component: dashboardSettingsComponent},
      notFound
    ]},
    {path: 'veranstaltungsorte', component: routeComponent, children: [
      {path: '', component: veranstaltungsortComponent},
      {path: ':id', component: veranstaltungsortDetails, children: [
        {path: 'allgemein', component: veranstaltungsortAllgemeinDetails},
        {path: 'kontakt', component:veranstaltungsortKontaktDetails},
        {path: 'veranstaltungen', component: veranstaltungsortVeranstaltungenDetails}
      ]}
    ]},
    {path: 'organisationen', component: routeComponent, children:[
      {path: '', component: orgaList},
      {path: ':id', component: orgaDetails, children: [
        {path: '', redirect: 'allgemein'},
        {path: 'allgemein', component: orgaDetailsAllgemein},
        {path: 'veranstaltungen', component: orgaDetailsVeranstaltungen},
        {path: 'veranstaltungsorte', component: orgaDetailsVeranstaltungsorte},
        notFound
      ]},
      notFound
    ]},
    {path:'impressum', component:impressumComponent},
    {path: "401", component: err401},
    {path: "404", component: err404},
    {path: "500", component: err500},
    notFound
  ]},
  notFound
];

export default routes;
