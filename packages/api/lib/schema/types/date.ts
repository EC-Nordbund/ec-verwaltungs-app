import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString
} from 'graphql'

const gb = v => (v < 10 ? '0' + v : v)

export const _date = new GraphQLObjectType({
  name: 'DateType',
  description: 'Ein Datum',
  fields: () => ({
    day: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Tag des Datums.',
      resolve(val: Date) {
        return val.getDate()
      }
    },
    month: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Monat des Datums.',
      resolve(val: Date) {
        return val.getMonth() + 1
      }
    },
    year: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Jahr des Datum.',
      resolve(val: Date) {
        return val.getFullYear()
      }
    },
    german: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'TT.MM.YYYY layout des Datum.',
      resolve(val: Date) {
        return `${gb(val.getDate())}.${gb(
          val.getMonth() + 1
        )}.${val.getFullYear()}`
      }
    },
    input: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'YYYY-MM-TT layout des Datum.',
      resolve(val: Date) {
        return `${val.getFullYear()}-${gb(
          val.getMonth() + 1
        )}-${gb(val.getDate())}`
      }
    }
  })
})
