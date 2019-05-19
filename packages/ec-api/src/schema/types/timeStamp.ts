import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} from 'graphql'

const gb = v => (v < 10 ? '0' + v : v)

export const _timestamp = new GraphQLObjectType({
  name: 'TimeStampType',
  fields: () => ({
    day: {
      type: GraphQLInt,
      resolve(val: Date) {
        if (val instanceof Date) {
          return val.getDate()
        } else {
          return null
        }
      }
    },
    month: {
      type: GraphQLInt,
      resolve(val: Date) {
        if (val instanceof Date) {
          return val.getMonth() + 1
        } else {
          return null
        }
      }
    },
    year: {
      type: GraphQLInt,
      resolve(val: Date) {
        if (val instanceof Date) {
          return val.getFullYear()
        } else {
          return null
        }
      }
    },
    h: {
      type: GraphQLInt,
      resolve(val: Date) {
        if (val instanceof Date) {
          return val.getHours()
        } else {
          return null
        }
      }
    },
    min: {
      type: GraphQLInt,
      resolve(val: Date) {
        if (val instanceof Date) {
          return val.getMinutes()
        } else {
          return null
        }
      }
    },
    s: {
      type: GraphQLInt,
      resolve(val: Date) {
        if (val instanceof Date) {
          return val.getSeconds()
        } else {
          return null
        }
      }
    },
    german: {
      type: GraphQLString,
      resolve(val: Date) {
        if (val instanceof Date) {
          return `${gb(val.getDate())}.${gb(
            val.getMonth() + 1
          )}.${val.getFullYear()} - ${gb(
            val.getHours()
          )}:${gb(val.getMinutes())}`
        } else {
          return null
        }
      }
    }
  })
})
