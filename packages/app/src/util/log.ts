export const name = "log"

const types:{[type:string]:{text:string,colorA:string,colorB:string}} = {
  none: {
    text: 'Logging: ',
    colorA: '#35495e',
    colorB: '#41b883'
  }
}

export default (msg:string, type:string = 'none') => {
  console.log(
    `%c ${types[type].text}: %c ${msg} %c`, 
    `background:${types[type].colorA} ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff`, 
    `background:${types[type].colorB} ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff`, 
    "background:transparent")
}