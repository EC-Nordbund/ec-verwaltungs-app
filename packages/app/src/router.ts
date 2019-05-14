import Vue, { CreateElement } from 'vue';
import Router, { RouteConfig } from 'vue-router';
import * as deepmerge from 'deepmerge';


const notFound: RouteConfig = {
  path: '*',
  redirect: (to) => ({
    path: '/404',
    query: {
      prev: to.fullPath
    }
  })
};

const context = require.context('@/pages', true, /\w+\.route.vue/);

const data: IFolderFile = deepmerge.all(
  context
    .keys()
    .map((v) =>
      handleComp(context(v).default || context(v), v.split('/').slice(1))
    )
) as IFolderFile;

interface IComponent extends Vue {
  routeMeta: any;
}

interface IComponentFolder {
  ___isFolder: true;
  [name: string]: IComponentFolder | IComponentFile | IFolderFile | true;
}

interface IFolderFile {
  ___isComponent: true;
  meta: object;
  component: IComponent;
  ___isFolder: true;
  [name: string]: IComponentFolder | IComponentFile | true | IComponent | object;
}

interface IComponentFile {
  ___isComponent: true;
  meta: object;
  component: IComponent;
}

function handleComp(component: IComponent, path: string[]): IComponentFolder|IComponentFile {
  if (path.length === 0) {
    return {
      component,
      meta: component.routeMeta,
      ___isComponent: true
    };
  } else {
    return {
      ___isFolder: true,
      [path[0].split('.')[0]]: handleComp(component, path.slice(1))
    };
  }
}

function generateRoutes(obj: IDirObj): RouteConfig[] {
  return Object.keys(obj)
    .filter(
      (key) =>
        ['component', 'meta', '___isComponent', '___isFolder'].indexOf(key) ===
        -1
    )
    .reverse()
    .map((key) => generateRoutesMapper(obj, key));
}

function generateRoutesMapper(obj: any, key: string): RouteConfig {
  if (obj[key].___isComponent) {
    if (obj[key].___isFolder) {
      return generateRoutesMapperFolderAndComponent(obj, key);
    } else {
      return generateRoutesMapperComponent(obj, key);
    }
  } else {
    return generateRoutesMapperFolder(obj, key);
  }
}

type IDirObj = IFolderFile | IComponentFolder | IComponentFile;

function generateRoutesMapperFolder(obj: any, key: string): RouteConfig {
  return {
    path: handlePath(key),
    children: [...generateRoutes(obj[key]), notFound],
    component: {
      // render: (h: CreateElement) => h('router-view')
      render: (h) => h('router-view')
    }
  };
}
function generateRoutesMapperComponent(obj: any, key: string): RouteConfig {
  return {
    path: handlePath(key),
    component: obj[key].component,
    meta: obj[key].meta
  };
}
function generateRoutesMapperFolderAndComponent(obj: any, key: string): RouteConfig {
  return {
    path: handlePath(key),
    component: obj[key].component,
    children: [
      ...generateRoutes(obj[key]),
      notFound
    ],
    meta: obj[key].meta
  };
}

function handlePath(path: string) {
  if (path === '_') {
    return '';
  } else {
    if (path.substr(0, 1) === '_') {
      return ':' + path.substr(1);
    } else {
      return path;
    }
  }
}

// console.log(generateRoutes(data))

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      children: [
        ...generateRoutes(data),
        notFound
      ],
      component: {
        // render: (h) => h('router-view')
        render: (h) => h('router-view')
      }
    }
  ]
});

export default router;
