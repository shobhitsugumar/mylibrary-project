const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const routehandler = require("./routes/homerouter");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layouts/layouts");

app.use(expressLayouts);
app.use(express.static("public"));

app.use("/", routehandler);

module.exports = app;
