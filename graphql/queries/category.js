const
  {
    GraphQLList,
    GraphQLInt
  } = require('graphql')
const {
    categoryType,
} = require('../types/category')
const categoryController = require('../controllers/categoryController')
const { catchErrors } = require('../../errorhandlers');

exports.listCategory = {
  type: new GraphQLList(categoryType),
  args: {
    limit: {
      type: GraphQLInt
    },
    start: {
      type: GraphQLInt
    }
  },
  resolve: catchErrors(categoryController.listCategory)
}
