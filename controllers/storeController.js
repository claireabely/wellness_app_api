const express = require("express");
const Store = require("../models/storeModel");
const MenuItem = require("../models/menuItemModel");
const stores = express.Router();

// DATA
const newStores = require("../dataFiles/storeData");

// ROUTES
// read
stores.get("/", (req, res) => {
    Store.find({})
        .populate("menu")
        .exec(function(error, foundStores) {
            if (error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(200).json(foundStores);
            }
        });
});

// show
stores.get("/:id", (req, res) => {
    Store.find({ _id: req.params.id }, (error, foundItems) => {
        if (error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(200).json(foundItems);
        }
    });
});

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

// seed
// stores.get("/seed/seed", (req, res) => {
//     console.log(newStores);
//     Store.create(newStores, (err, stores) => {
//         if (err) {
//             console.log(err);
//         }
//         console.log("SEED: NEW STORES CREATED!");
//         res.redirect("/stores");
//     });
// });

// seed-newschema-stores
stores.get("/seed/seed", (req, res) => {
    // console.log(newStores);
    Store.create(newStores, (err, createdStores) => {
        if (err) {
            console.log(err);
        } else {
            console.log("SEED: NEW STORES CREATED!");

            createdStores.map((r) => {
                console.log(r);
                MenuItem.find({ store_id: r.store_id }, (err, foundItem) => {
                    console.log(foundItem); //array
                    foundItem.map((item) => {
                        Store.findByIdAndUpdate(
                            r._id, {
                                $push: { menu: item._id },
                            },
                            (err, success) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log(success);
                                }
                            }
                        );
                    });
                });
            });
        }
        res.redirect("/stores");
    });
});

module.exports = stores;

// const express = require("express");
// const Store = require("../models/storeModel");
// const MenuItem = require("../models/menuItemModel");
// const stores = express.Router();

// const menuItems = require("../dataFiles/menuItemData")
// // ROUTES
// // read
// stores.get("/", (req, res) => {
//     Store.find({}, (error, foundStores) => {
//         if (error) {
//             res.status(400).json({ error: error.message });
//         } else {
//             res.status(200).json(foundStores);
//         }
//     });
// });
// stores.get("/seed/menuitems"), (req, res) => {
//     MenuItem.create(menuItems, (err, stores) =>{
//         if (err) {console.log(err) }    
//         console.log('SEED: NEW MENU ITEMS CREATED!')

//         res.redirect('/stores')
// })
// console.log('test')
// }



// // create
// stores.post("/new", (req, res) => {
//     Store.create(req.body, (error, createdStore) => {
//         if (error) {
//             res.status(400).json({ error: error.message });
//         } else {
//             res.status(200).json(createdStore);
//         }
//     });
// });

// // delete
// stores.delete("/:id", (req, res) => {
//     Store.findByIdAndDelete(req.params.id, (error, deletedStore) => {
//         if (error) {
//             res.status(400).json({ error: error.message });
//         } else {
//             res.status(200).json(deletedStore);
//         }
//     });
// });

// const newStores= require('../dataFiles/storeData.js');
// const menuItemSchema = require("../models/menuItemModel");
// stores.get('/seed', (req, res) => {
//     console.log(newStores)
//     Store.create(newStores, (err, stores) =>{
//         if (err) {console.log(err) }    
//         console.log('SEED: NEW STORES CREATED!')

//         res.redirect('/stores')
//     })
// })

// // show
// stores.get("/:id", (req, res) => {
//     Store.find({ store_id: req.params.id }, (error, foundItems) => {
//         if (error) {
//             res.status(400).json({ error: error.message });
//         } else {
//             res.status(200).json(foundItems);
//         }
//     });
// });
// module.exports = stores;