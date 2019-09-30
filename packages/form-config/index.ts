import { jsonable } from "./jsonable";

export interface IConfig extends jsonable {
    groups: Array<IGroup>
    config: {
        visibilityLogic: Array<LogicScope>
    }
}

interface LogicScope {
    fields: Array<string>
    groups: Array<string>
    operator: Term
    visible: boolean
    
}

interface IGroup {
    id: string
    label: string
    fields: Array<TField>
    visible: boolean
}

type TField= IFieldText|IFieldArea|IFieldNumber|IFieldSelect|ICheckbox|IRadio

interface IBaseField {
    id: string
    label: string
    type: string
    apiType: 'number'|'string'|'boolean'
    rules: Array<IRule>
    visible: boolean
    hint?: string
    default?: jsonable
}

interface IFieldText extends IBaseField {
    type: "text-field"
    inputType: string
    size?: number
    placeholder?: string
    readonly?: boolean
    prefix?: string
    suffix?: string
    unit?: string
}

interface ICheckbox extends IBaseField {
    type: "boolean"
}

interface IRadio extends IBaseField {
    type: "radio"
    items: Array<{
        label: string
        value: string|number
    }>
}

interface IFieldArea extends IBaseField {
    type: "text-area"
    autoGrow?: boolean
    size?: number
    rows?: number
    noResize?: boolean
    placeholder?: string
    readonly?: boolean
}

interface IFieldNumber extends IBaseField {
    type: "number"
    min: number
    max: number
    step?: number
    readonly?: boolean
}

interface IFieldSelect extends IBaseField {
    type: "array"
    items: Array<{
        label: string
        value: string|number
    }>
    multiple?: boolean
    autocomplete?: boolean

}

type IRule = string | {
    type: string
    param: number | string | boolean
}

type Term = Condition | OR | AND

interface Condition {
    type: undefined
    compareField: string
    operator: '<'|'>'|'='
    value: string|number|boolean
}

interface OR {
    type: 'or',
    items: Array<Term>
}

interface AND {
    type: 'and',
    items: Array<Term>
}
