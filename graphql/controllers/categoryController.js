var db = require("../../db.js");

exports.addCategory = async (root, {categoryName,categoryImage}) => {
    if (categoryName&&categoryImage) {
      var newCategory = await db.Category({ categoryName:categoryName,categoryImage:categoryImage })
      var category = await newCategory.save()
      category.message = 'Category added'
      category.status = 200
      return Promise.resolve(category);
    }
    else {
      return Promise.resolve({ message: 'Please  enter categoryName or categoryImage ', status: 400 });
    }
  }

  exports.listCategory = async (root, { limit, start }) => {
    limit = limit
    let category = await db.Category.find().skip(start).limit(parseInt(limit));
    var dataSorted = _.sortBy(category, 'categoryName');
    return dataSorted;
  }


    //Edit category 
exports.editCategory= async (root, { _id, categoryName,categoryImage,description}) => {
    var category = await db.Category.findById({ _id: _id })
    if (!category) {
      return Promise.resolve({ message: 'Category doesnot exist', status: 400 })
    }
    else {
      var edited = await db.Category.findOneAndUpdate({ _id: _id },{ $set: {categoryName:categoryName,categoryImage:categoryImage,modifiedDate: new Date() }})
      var currentCategory = await db.Category.findById({ _id: _id })
      currentCategory.message = 'Category  Details Updated'
      currentCategory.status = 200
      return Promise.resolve(currentCategory)
    }
  }


  //Delete Article
exports.deleteCategory = async (root, { _id }) => {
    var deleteCategory = await db.Category.findByIdAndRemove(_id)
    var checkCategory = await db.Category.findById({ _id })
    return Promise.resolve({ message: 'Category deleted' })
  }
  