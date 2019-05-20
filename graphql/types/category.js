const {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLID,
    GraphQLString
} = require('graphql')

exports.categoryType = new GraphQLObjectType({
    name: 'categoryType',
    description: 'definition of category type',
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        categoryName: {
            type: GraphQLString
        },
        categoryImage: {
            type: GraphQLString
        }
    })
})

exports.categoryInput = new GraphQLInputObjectType({
    name: 'categoryInput',
    description: 'definition of category input',
    fields: () => ({
        categoryName: {
            type: GraphQLString
        },
        categoryImage: {
            type: GraphQLString
        }
    })
})
