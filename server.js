
// DEPENDENCIES
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

require("dotenv").config();

// CONFIGURATIONS
const PORT = process.env.PORT;
const mongodbURI = process.env.MONGODB_URI;
console.log(mongodbURI)
mongoose.connection;

// DATABASE
mongoose.connect(
    mongodbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
    () => {
        console.log("the connection with mongod is established at", mongodbURI);
    }
);

const corsOptions = {
    origin: ["*", "http://localhost:3000", "https://wellnessapps.herokuapp.com/"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(":method :url :status"));
app.use(cors(corsOptions));

// CONTROLLERS
const storeController = require("./controllers/storeController");
app.use("/stores", storeController);

const orderController = require("./controllers/orderController");
app.use("/orders", orderController);

const menuItemController = require("./controllers/menuItemController");
app.use("/menuitems", menuItemController);

const userController = require("./controllers/userController")
app.use("/users", userController);

// ROUTE
app.get("/", (req, res) => {
    res.send("index route working");
});

// LISTENER
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});






// // DEPENDENCIES
// const express = require("express");
// const mongoose = require("mongoose");
// const morgan = require("morgan");
// const app = express();
// const cors = require("cors");

// require('dotenv').config();

// // CONFIGURATIONS
// const PORT = process.env.PORT;
// // const mongodbURI = "process.env.MONOGODB_URI//localhost:27017/wellness_orders";
// // const mongodbURI = "mongodb://localhost:27017/wellness_orders";
// const mongodbURI = process.env.MONGODB_URI;
// mongoose.connection;

// // DATABASE

// // DATABASE
// mongoose.connect(
//     mongodbURI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useFindAndModify: false,
//     },
//     () => {
//         console.log("the connection with mongod is established at", mongodbURI);
//     }
// );

// const corsOptions = {
//     origin: ["*", "http://localhost:3000", "https://food-hubbs.herokuapp.com"],
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
// };
// // MIDDLEWARE
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(morgan(":method :url :status"));
// app.use(cors(corsOptions));

// // CONTROLLERS
// const storeController = require("./controllers/storeController");
// app.use("/stores", storeController);

// const orderController = require("./controllers/orderController");
// app.use("/orders", orderController);

// const menuItemController = require("./controllers/menuItemController");
// app.use("/menuitems", menuItemController);

// const userController = require("./controllers/userController")
// app.use("/users", userController);


// // ROUTE
// app.get("/", (req, res) => {
//     res.send("index route working");
// });

// // LISTENER
// app.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}...`);
// });