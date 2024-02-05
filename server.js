const mongose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("connected to the database"));

app.listen(process.env.PORT || 3000, () => {
  console.log("server running on port");
});
