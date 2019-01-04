import AppComponent from '@/views/App.vue';
import LoginComponent from '@/views/Login.vue';
import { RouteConfig } from 'vue-router';
import err401 from "@/views/fehler/401.vue";
import routeComponent from '@/config/router.vue'
import err404 from "@/views/fehler/404.vue";
import err500 from "@/views/fehler/500.vue";
import orgaList from '@/views/organisationen/liste.vue'
import orgaDetails from '@/views/organisationen/details.vue'
import orgaDetailsAllgemein from '@/views/organisationen/details/allgemein.vue'
import orgaDetailsVeranstaltungen from '@/views/organisationen/details/veranstaltungen.vue'
import orgaDetailsVeranstaltungsorte from '@/views/organisationen/details/veranstaltungsorte.vue'

const notFound:RouteConfig = {path: '*', redirect: to => ({
  path: '/404',
  query: {
    prev: to.fullPath
  }
})}

const routes: RouteConfig[] = [
  {path: "/login", component: LoginComponent},
  {path: "/", component: AppComponent, children: [
    {path: 'organisationen', component: routeComponent, children:[
      {path: '', component: orgaList},
      {path: ':id', component: orgaDetails, children: [
        {path: '', redirect: 'allgemein'},
        {path: 'allgemein', component: orgaDetailsAllgemein},
        {path: 'veranstaltungen', component: orgaDetailsVeranstaltungen},
        {path: 'veranstatungsorte', component: orgaDetailsVeranstaltungsorte},
        notFound
      ]},
      notFound
    ]},
    {path: "401", component: err401},//not allowed
    {path: "404", component: err404},//not found
    {path: "500", component: err500},//sonstige Fehler
    notFound
  ]},
  notFound
];

export default routes;
