var mongoose = require("mongoose");
require("dotenv").load();
mongoose.connect("mongodb://localhost:27017/club19Dev", { useNewUrlParser: true });
exports.mongoose = mongoose;

var Schema = mongoose.Schema;

// User Schema
var UserSchema = new Schema({
    email: {
        type: String
    },
    firstName: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    password: {
        type: String
    },
    createdDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    lastName: {
        type: String
    },
    userName: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    zipcode: {
        type: String
    },
    favourites: [{
        itemName: String,
        Description: String,
        basePrice: String,
        hasModifiers: Boolean,
        modifiers: [{
            size: String,
            addOns: [String]
        }],
        quantity: Number,
        addedToCart: Boolean
    }],
    oders: [String],
    cartItems: [String],
    cardDetails: [String],
    payments: [String],
    userName: {
        type: String
    },
    modifiedDate: {
        type: Date
    }
})

exports.User = mongoose.model('User', UserSchema, 'users');


// Category Schema
var CategorySchema = new Schema({
    categoryName: String,
    categoryImage: String,
    createdDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    modifiedDate: {
        type: Date
    },
    description: String
})
exports.Category = mongoose.model('Category', CategorySchema, 'category');

// Item Schema
var ItemSchema = new Schema({
    categoryId: String,
    itemName: String,
    categoryName: String,
    description: String,
    createdDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    modifiedDate: {
        type: Date
    },
    picture: String,
    basePrice: String,
    hasModifiers: Boolean,
    Modifiers: [
        {
            size: [{
                type: String,
                price: String
            }],
            addOns: [{
                type: String,
                price: String
            }]
        }

    ],
    quantity: String,
    addedToCart: Boolean

})
exports.Item = mongoose.model('Item', ItemSchema, 'item');

