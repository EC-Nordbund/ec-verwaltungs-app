type siType = string | number | boolean

export type rule = Array<
  | rules<boolean>
  | rules<string>
  | rules<number>
  | rules<siType>
>

type rulesFactory = (...args: Array<string>) => rule

type rules<R> = (value: R) => true | string

export const required = (name: string) => (value: siType) =>
  !value ? `Du musst ${name} eingeben!` : true

export const minLength = (
  name: string,
  artikel: string,
  length: number
) => (value: string) =>
  value && value.length < length
    ? `Du musst ${name} angeben, ${artikel} mindestens ${length} Zeichen lang ist!`
    : true

export const maxLength = (
  name: string,
  artikel: string,
  length: number
) => (value: string) =>
  (value || '').length > length
    ? `Du musst ${name} angeben, ${artikel} maximal ${length} Zeichen lang ist!`
    : true

export const exactLength = (
  name: string,
  artikel: string,
  length: number
) => (value: string) =>
  value.length !== length
    ? `Du musst ${name} angeben, ${artikel} genau ${length} Zeichen lang ist!`
    : true

export const inArray = (
  name: string,
  ...values: Array<string>
) => (value: string) =>
  values.indexOf(value) === -1
    ? `${name} muss ein Element aus ${values.join(
        ','
      )} sein!`
    : true

export const isType = (name: string, type: string) => (
  value: siType
) =>
  typeof value === type
    ? true
    : `${name} muss vom Typ ${type} sein!`
