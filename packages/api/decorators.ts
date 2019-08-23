import { Socket } from "socket.io";
import { param } from "./validatoren";

let connector: typeof connectorBase

export function setAPIClass(api: any) {
  connector = api
}

const sqlExcec = (sql: string): Promise<any> => {
  return;
};

/**
 * Registriert eine Methode zur nutzung mit SocketIO
 */
export const register = () => (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => {
  console.log(target)
  connector.methods.push(propertyKey);  
};

export const mutation = (mutationName: string, params: Array<param>) => (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => {
  descriptor.value = function(...args: (number | boolean | string)[]) {
    const self: connectorBase = this;
    return new Promise((res, rej) => {
      const fehler = params
        .map((par, id) =>
          par.valiatoren
            .map(validator => validator(args[id]))
            .filter(valid => valid !== true)
            .join("\n")
        )
        .filter(fehler => fehler !== "")
        .join("\n");
      if (fehler.length > 0) {
        rej(fehler);
      } else {
        if (self.isClient) {
          const id = self.UUID();
          self.socket.once(`${id}-error`, rej);
          self.socket.once(`${id}-result`, res);
          self.socket.emit(mutationName, ...args);
        } else {
          sqlExcec(
            `SELECT ${mutationName}(${args.map(
              v => "'" + v.toString() + "'"
            )}) AS result`
          )
            .then(r => r[0].result)
            .then(res)
            .catch(rej);
        }
      }
    });
  };
};

export abstract class connectorBase {
  constructor(public isClient:boolean, public socket:Socket) {
    connector.methods.forEach(method => {
      socket.on(method, (id:string, ...args: any[])=>{
        this[method](...args).then(result=>{
          socket.emit(`${id}-result`, result)
        }).catch(err => {
          console.log([id, ...args, socket.id, err])
          socket.emit(`${id}-error`, err)
        })
      })
    })

    connector.instances.push(this)

    socket.emit('welcome')
  }

  static instances:Array<connectorBase> = []

  UUID():string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);return v.toString(16);});
  }

  static methods:Array<string> = []
}


export const query = (
  params: Array<param>,
  sql: Array<
    (
      self: connectorBase,
      ...args: any[]
    ) => {
      name: string;
      sql: string;
    } | null
  >
) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
  descriptor.value = function(...args: (number | boolean | string)[]) {
    const self: connectorBase = this;
    return new Promise((res, rej) => {
      const fehler = params
        .map((par, id) =>
          par.valiatoren
            .map(validator => validator(args[id]))
            .filter(valid => valid !== true)
            .join("\n")
        )
        .filter(fehler => fehler !== "")
        .join("\n");
      if (fehler.length > 0) {
        rej(fehler);
      } else {
        if (self.isClient) {
          const id = self.UUID();
          self.socket.once(`${id}-error`, rej);
          self.socket.once(`${id}-result`, res);
          self.socket.emit(propertyKey, ...args);
        } else {
          let sqlQuerys = sql.map(v => v(self, ...args));
          let result = Promise.all(
            sqlQuerys.map(v => {
              return sqlExcec(v.sql).then(result => ({
                name: v.name,
                result
              }));
            })
          );
          result
            .then(results => {
              let r: any = {};
              results.forEach(v => {
                r[v.name] = result;
              });
              res(r);
            })
            .catch(rej);
        }
      }
    });
  };
};


export const inform = (informName: string, idValue:null|number = null) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
  const old = descriptor.value

  descriptor.value = (...args:Array<any>) => {
    if(idValue === null) {
      connector.instances.forEach(inst => {
        inst.socket.emit('inform', informName)
      })
    } else {
      connector.instances.forEach(inst => {
        inst.socket.emit('inform', informName, args[idValue])
      })
    }
    return old(...args)
  }
}