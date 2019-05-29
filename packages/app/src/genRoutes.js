const dirTree = require("directory-tree");
const tree = dirTree("./pages");

let val = 'export default ' + JSON.stringify(handleFolder(tree.children)).split('"/|').join('').split('|/"').join('').split('\\\\').join('/')

const fs = require('fs')

fs.writeFileSync('./gen_routes.js', val)

function handleFolder(folder) {
  let ret = folder.map(v=>{
    if(v.type==='file') {
      let path = v.name.split('.')[0];

      if(path==='_') {
        let fol = folder.filter(e=>e.name==='_').filter(v=>v.type!=='file')[0]

        if (fol) {
          return {
            path: '',
            component: `/|() => import('@/${v.path}')|/`,
            children: handleFolder(fol.children)
          }  
        } else {
          return {
            path: '',
            component: `/|() => import('@/${v.path}')|/`
          }
        }
        


      } else if (path[0]==='_') {
        return {
          path: `:${path.substr(1)}`,
          component: `/|() => import('@/${v.path}')|/`
        }
      } else {
        return {
          path,
          component: `/|() => import('@/${v.path}')|/`
        }
      }
    } else {
      let path = v.name.split('.')[0];
      if(path==='_') {
        return null 
      } else if (path[0]==='_') {
        return {
          path: `:${path.substr(1)}`,
          children: handleFolder(v.children),
          component: {render: `/|(h) => h('router-view')|/`}
        }
      } else {
        return {
          path,
          children: handleFolder(v.children),
          component: {render: `/|(h) => h('router-view')|/`}
        }
      }
    }
  }).filter(v=>!!v)

  ret.push({
    path: '*',
    redirect: `/|(to) => ({path: '/404', query: {prev: to.fullPath}})|/`
  })

  return ret
}