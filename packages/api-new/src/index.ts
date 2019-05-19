// // function a() {
  
// // }

// // class connection {
// //   constructor(socket) {
// //     // Etabliere Verbindung
// //   }

// //   public mutate(mutation: string, data: any):Promise<any> {
// //     // ...
// //     return
// //   }

// //   public query(query: string, variables: any): observer<any> {
// //     return
// //   }
// // }

// // export function login(username:string, password:string):Promise<{c: connection, autoLogout: observer<number>}> {
// //   return new Promise((res, rej)=>{
    
// //   })
// // }
// // async ()=>{
// //   let _ = await login('test', 'pwd');
// //   let data = _.c.query('test', {})
// // }




// class observer<T> {
//   private _count = 0;

//   private _res = (val:T, id: number)=>{}
//   private _rej = (err: Error)=>{}
//   private _des: ()=>void

//   constructor(cb: (res: (val: T) => void, rej: (err: Error) => void) => void, destroyed: () => void = () => {}) {
//     let self = this;
//     setTimeout(() => {
//       try {
//         cb(self.resolve, self.reject)
//       } catch (error) {
//         this._rej(error)
//       }
//     }, 0)

//     this._des = destroyed
//   }

//   public then(cb: (val:T, id: number) => void) {
//     this._res = cb
//     return this
//   }

//   public catch(cb: (err: Error) => void) {
//     this._rej = cb
//     return this
//   }
  
//   public destroy() {
//     setTimeout(() => {this._des()},0)
//     this._res = () => {}
//     this._rej = () => {}
//   }

//   private resolve(val:T) {
//     this._count = this._count + 1
//     setTimeout(() => {this._res(val, this._count)},0)
//   }

//   private reject(err: Error) {
//     setTimeout(() => {this._rej(err)},0)
//     this.destroy()
//   }
// }


// function ob() {
//   let timer: any = null;
//   return new observer<number>((res, rej) => {
//     timer = setInterval(() => {res(1)}, 1000)
// //   }, () => {
// //     clearInterval(timer)
// //   })
// // }

// // let _ = ob().then(console.log)


// import { observable, observe } from '@nx-js/observer-util';
 
// const counter = observable({ num: 0 });
// const countLogger = observe(() => console.log(counter.num));



// // this calls countLogger and logs 1
// counter.num++;


interface adresse {
  readonly adressID: number
  readonly personID: number
  strasse: string
  plz: string
  ort: string
}

// let _ = 
