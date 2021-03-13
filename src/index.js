const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const initialSetup = require("./libs/initialSetup")

require("./config/conexion");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initialSetup.createRoles();
initialSetup.createInitialAccount();
app.use(require("./route/login"));
app.use(require("./route/category"));
app.use(require("./route/product"));
app.use(require("./route/bill"));
app.use(require("./route/shoppingcart"));
app.use(require("./route/user"));


app.listen(3000, () => console.log("Server is on port 3000") );