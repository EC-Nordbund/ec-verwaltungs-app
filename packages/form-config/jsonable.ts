type basic = number | boolean | string
export interface jsonable {
    [key:string]: basic | jsonableObj | Array<jsonableObj | basic>
}
