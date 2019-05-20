const {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLID,
    GraphQLString
} = require('graphql')

exports.userType = new GraphQLObjectType({
    name: 'userType',
    description: 'definition of User type',
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        firstName: {
            type: GraphQLString
        },
        message: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        status: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        },
        phoneNumber: {
            type: GraphQLString
        },
        lastName: {
            type: GraphQLString
        },
        userName: {
            type: GraphQLString
        },
        address: {
            type: GraphQLString
        },
        city: {
            type: GraphQLString
        },
        zipCode: {
            type: GraphQLString
        }
    })
})

exports.userInput = new GraphQLInputObjectType({
    name: 'userInput',
    description: 'definition of User input',
    fields: () => ({
        firstName: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        },
        phoneNumber: {
            type: GraphQLString
        },
        lastName: {
            type: GraphQLString
        },
        userName: {
            type: GraphQLString
        },
        address: {
            type: GraphQLString
        },
        city: {
            type: GraphQLString
        },
        zipCode: {
            type: GraphQLString
        }
    })
})
