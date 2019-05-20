const
  {
    GraphQLString,
    GraphQLID
  } = require('graphql')
const {
    categoryType
} = require('../types/category')
const categoryController = require('../controllers/categoryController')
const { catchErrors } = require('../../errorhandlers');


exports.addCategory = {
    type: categoryType,
    args: {
        categoryName: {
        type: GraphQLString
      },
      categoryImage: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      },
    },
    resolve: catchErrors(categoryController.addCategory)
  }


  exports.editCategory = {
    type: categoryType,
    args: {
      _id: {
        type: GraphQLID
      },
      categoryName: {
        type: GraphQLString
      },
      categoryImage: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      },
    },
    resolve: catchErrors(categoryController.editCategory)
  }

  exports.deleteCategory = {
    type: categoryType,
    args: {
      _id: {
        type: GraphQLID
      }
    },
    resolve: catchErrors(categoryController.editCategory)
  }