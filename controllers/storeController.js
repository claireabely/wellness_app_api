const express = require("express");
const Store = require("../models/storeModel");
const MenuItem = require("../models/menuItemModel");
const stores = express.Router();

const menuItems = require("../dataFiles/menuItemData")
// ROUTES
// read
stores.get("/", (req, res) => {
    Store.find({}, (error, foundStores) => {
        if (error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(200).json(foundStores);
        }
    });
});
stores.get("/menuitems"), (req, res) => {
    MenuItem.create(menuItems, (err, stores) =>{
        if (err) {console.log(err) }    
        console.log('SEED: NEW MENU ITEMS CREATED!')

        res.redirect('/stores')
})
}



// create
stores.post("/new", (req, res) => {
    Store.create(req.body, (error, createdStore) => {
        if (error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(200).json(createdStore);
        }
    });
});

// delete
stores.delete("/:id", (req, res) => {
    Store.findByIdAndDelete(req.params.id, (error, deletedStore) => {
        if (error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(200).json(deletedStore);
        }
    });
});

const newStores= require('../dataFiles/storeData.js');
const menuItemSchema = require("../models/menuItemModel");
stores.get('/seed', (req, res) => {
    console.log(newStores)
    Store.create(newStores, (err, stores) =>{
        if (err) {console.log(err) }    
        console.log('SEED: NEW STORES CREATED!')

        res.redirect('/stores')
    })
})

// show
stores.get("/:id", (req, res) => {
    Store.find({ store_id: req.params.id }, (error, foundItems) => {
        if (error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(200).json(foundItems);
        }
    });
});
module.exports = stores;