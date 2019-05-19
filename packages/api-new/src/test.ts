type update<T> = {
  [K in keyof T]: null | ((oldValue: T[K], newValue: T[K]) => void)
}

function observable<T extends object>(target: T, update: update<T>, logger?: (target: T, prop: string | number | symbol, value: any)=>void) {
  return new Proxy(target, {
    get: (target, prop) => {
      return target[prop];
    },
    set: (target, prop, v) => {
      if (update[prop]) {
        update[prop](target[prop], v)
      }
      if (logger) {
        logger(target, prop, v)
      }
      target[prop] = v;
      return true;
    }
  })
}


let data: {
  personen:Array<{
    vorname: string,
    nachname: string,
    gebDat: string
  }>
} = {
  personen: []
}

function addPerson(vorname: string, nachname: string, gebDat: string) {
  data.personen.push(observable({vorname, nachname, gebDat}, {
    vorname: console.log,
    nachname: console.log,
    gebDat: console.log
  }, console.log))
}


addPerson("vorname", "nachname", "gebDat")
addPerson("vorname", "nachname", "gebDat")
addPerson("vorname", "nachname", "gebDat")
addPerson("vorname", "nachname", "gebDat")

console.log(data);

data.personen[1].vorname = 'neuerVorname'


