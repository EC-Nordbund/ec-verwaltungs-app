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
import routeComponent from '@/config/router.vue';
import singlePage from '@/views/dashboard/singlePage.vue';
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
    {path: "401", component: err401},
    {path: "404", component: err404},
    {path: "500", component: err500},
    notFound
  ]},
  notFound
];

export default routes;
