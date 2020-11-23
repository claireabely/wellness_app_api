const mongoose = require('mongoose')

const Schema = mongoose.Schema

// const menuItemSchema = require('./menuItemModel')


const storeSchema = new Schema({
    store_id: {type: String},
    storeName: {type: String},
    apartmentNumber: {type: Number},
    streetname: {type: String},
    zipcode: {type: Number},
    phoneNumber: {type: Number},
    imgUrl: {type: String},
    rating: {type: Number},
    tags: [String],
    menu: [{
      type: Schema.Types.ObjectId,
      ref: "MenuItem",
  }, ],
});

const Store = mongoose.model('Store', storeSchema)


module.exports = Store