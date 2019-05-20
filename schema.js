const { GraphQLSchema, GraphQLObjectType } = require('graphql')
const queries = require('./graphql/queries')
const mutations = require('./graphql/mutations')

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: queries
  }),

  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: mutations
  })
})
