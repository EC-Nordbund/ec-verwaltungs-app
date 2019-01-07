export const name = "niceLogging"

const colors:Array<string> = [
  "35495e",
  "3a775e",
  "41b883"
]

export default (...args:Array<string>)=>{
  const text = args.map(v=>`%c ${v}`).join('') + '%c'
  const css = args.map((v:string,index:number)=>{
    if (index === 0) {
      return `background:#${colors[index]} ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff`
    } else if (index === args.length - 1) {
      return `background:#${colors[index]} ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff`
    } else {
      return `background:#${colors[index]} ; padding: 1px; border-radius: 0;  color: #fff`
    }
  })
  console.log(text, ...css, "background: transparent")
}