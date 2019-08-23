type validator = (value: any) => true | string;
export interface param {
  valiatoren: Array<validator>;
}


export class stringValidator implements param {
  constructor(private paramName: string) {}
  valiatoren: Array<validator> = [
    (val: any) =>
      typeof val === "string"
        ? true
        : `${this.paramName} muss eine Zeichenfolge sein.`
  ];
  numeric() {
    // TODO:
    return this
  }
  email() {
    // TODO:
    return this
  }
  maxLength(len: number) {
    this.valiatoren.push((v: string | null | undefined) =>
      !!v && v.length > len
        ? `${this.paramName} darf maximal ${len} Zeichen lang sein.`
        : true
    );
    return this;
  }
  enum(els:Array<string>) {
    this.valiatoren.push((v:string)=>els.indexOf(v)!==-1?true:`${this.paramName} darf nur bestimmte Werte anehmen.`)
    return this
  }
  isDate() {
    this.valiatoren.push((v:string)=>{
      return 'Dieser Validator geht noch nicht'
    })
    return this
  }
  minLength(len: number) {
    this.valiatoren.push((v: string | null | undefined) =>
      !!v && v.length < len
        ? `${this.paramName} muss minimal ${len} Zeichen lang sein.`
        : true
    );
    return this;
  }
  exactLength(len: number) {
    this.valiatoren.push((v: string | null | undefined) =>
      !!v && v.length !== len
        ? `${this.paramName} muss genau ${len} Zeichen lang sein.`
        : true
    );
    return this;
  }
  required() {
    this.valiatoren.push((val: string | undefined | null) => {
      return !val
        ? val === ""
          ? true
          : `${this.paramName} ist ein Benötigtes Feld.`
        : true;
    });
    return this;
  }
}
export class numberValidator implements param {
  constructor(private paramName: string) {}
  valiatoren: Array<validator> = [
    (val: any) =>
      typeof val === "number" ? true : `${this.paramName} muss eine Zahl sein.`
  ];
  ganz() {
    this.valiatoren.push((val: number) => {
      return Math.floor(val) === val
        ? true
        : `${this.paramName} muss eine ganze Zahl sein.`;
    });
    return this;
  }
  max(x: number) {
    this.valiatoren.push((val: number) => {
      return x >= val ? true : `${this.paramName} muss kleiner sein als ${x}.`;
    });
    return this;
  }
  min(x: number) {
    this.valiatoren.push((val: number) => {
      return x <= val ? true : `${this.paramName} muss größer sein als ${x}.`;
    });
    return this;
  }
  required() {
    this.valiatoren.push((val: number | undefined | null) => {
      return !val
        ? val === 0
          ? true
          : `${this.paramName} ist ein Benötigtes Feld.`
        : true;
    });
    return this;
  }
  dez(sig:number, dezimal:number) {
    // TODO:
    return this
  }
}
export class booleanValidator implements param {
  constructor(private paramName: string) {}
  valiatoren: Array<validator> = [
    (val: any) =>
      typeof val === "boolean"
        ? true
        : `${this.paramName} muss ein Boolean sein.`
  ];
  private isX(value: boolean) {
    this.valiatoren.push((val: boolean) => {
      return value === val ? true : `${this.paramName} muss ${value} sein.`;
    });
    return this;
  }
  isTrue() {
    return this.isX(true);
  }
  isFalse() {
    return this.isX(false);
  }
  required() {
    this.valiatoren.push((val: boolean | undefined | null) => {
      return !val
        ? val === false
          ? true
          : `${this.paramName} ist ein Benötigtes Feld.`
        : true;
    });
    return this;
  }
}
