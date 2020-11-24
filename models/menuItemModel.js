const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuItemSchema = new Schema({
    store_id: { type: String },
    name: { type: String },
    description: { type: String },
    imgURL: { type: String },
    price: { type: Number },
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

module.exports = MenuItem;