const
  {
    GraphQLList,
    GraphQLInt
  } = require('graphql')
const {
  userType
} = require('../types/users')
const usersController = require('../controllers/userController')
const { catchErrors } = require('../../errorhandlers');

exports.listUsers = {
  type: new GraphQLList(userType),
  args: {
    limit: {
      type: GraphQLInt
    },
    start: {
      type: GraphQLInt
    }
  },
  resolve: catchErrors(usersController.listUsers)
}
