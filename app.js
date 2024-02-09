const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const authoRouter = require("./routes/authorroute");
const bookRouter = require("./routes/bookrouter");
const homeRouter = require("./routes/homeroute");
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layouts/layouts");

app.use(expressLayouts);
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

//Routers
app.use("/", homeRouter);
app.use("/authors", authoRouter);
app.use("/books", bookRouter);

module.exports = app;
