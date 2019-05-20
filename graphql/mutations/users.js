const
  {
    GraphQLString,
    GraphQLID
  } = require('graphql')
const {
  userType
} = require('../types/users')
const userController = require('../controllers/userController')
const { catchErrors } = require('../../errorhandlers');


exports.signUp = {
  type: userType,
  args: {
    firstName: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString,
      description: 'email of the user.'
    },
    phoneNumber: {
      type: GraphQLString,
      description: 'User name of the user.'
    },
    password: {
      type: GraphQLString,
      description: 'Password of the User.'
    },
  },
  resolve: catchErrors(userController.signUp)
}

// User Login with email, password
exports.login = {
  type: userType,
  args: {
    email: {
      type: GraphQLString,
      description: 'email of the user.'
    },
    password: {
      type: GraphQLString,
      description: 'password of the user'
    },
  },
  resolve: catchErrors(userController.login)
}



exports.editProfile = {
  type: userType,
  args: {
    _id: {
      type: GraphQLID
    },
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    },
    address: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    phoneNumber: {
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
  },
  resolve: catchErrors(userController.editProfile)
}


exports.forgetPassword = {
  type: userType,
  args: {
    email: {
      type: GraphQLString
    }
  },
  resolve: catchErrors(userController.forgetPassword)
}