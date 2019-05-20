var db = require("../../db.js");


exports.addItem = async (root, {categoryId,itemName,categoryName,description,picture,basePrice,hasModifiers,sizeType,sizePrice,quantity,addedToCart}) => {
    if (ItemName&&ItemImage) {
      var newItem = await db.Item({ itemName:itemName,ItemImage:ItemImage })
      var Item = await newItem.save()
      Item.message = 'Item added'
      Item.status = 200
      return Promise.resolve(Item);
    }
    else {
      return Promise.resolve({ message: 'Please  enter ItemName or ItemImage ', status: 400 });
    }
  }

  exports.listItem = async (root, { limit, start }) => {
    limit = limit
    let Item = await db.Item.find().skip(start).limit(parseInt(limit));
    var dataSorted = _.sortBy(Item, 'ItemName');
    return dataSorted;
  }


    //Edit Item 
exports.editItem= async (root, { _id, ItemName,ItemImage,description}) => {
    var Item = await db.Item.findById({ _id: _id })
    if (!Item) {
      return Promise.resolve({ message: 'Item doesnot exist', status: 400 })
    }
    else {
      var edited = await db.Item.findOneAndUpdate({ _id: _id },{ $set: {ItemName:ItemName,ItemImage:ItemImage,modifiedDate: new Date() }})
      var currentItem = await db.Item.findById({ _id: _id })
      currentItem.message = 'Item  Details Updated'
      currentItem.status = 200
      return Promise.resolve(currentItem)
    }
  }


  //Delete Article
exports.deleteItem = async (root, { _id }) => {
    var deleteItem = await db.Item.findByIdAndRemove(_id)
    var checkItem = await db.Item.findById({ _id })
    return Promise.resolve({ message: 'Item deleted' })
  }
  