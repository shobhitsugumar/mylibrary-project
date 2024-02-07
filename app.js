const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const authoRouter = require("./routes/authorroute");
const indexRouter = require("./routes/index");
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layouts/layouts");

app.use(expressLayouts);
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use("/", indexRouter);
app.use("/authors", authoRouter);

module.exports = app;
