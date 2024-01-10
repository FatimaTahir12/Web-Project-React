const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
const { MONGO_URI } = process.env;


app.use(express.json());


mongoose.connect(""
   );

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(Router);

app.listen(5000, () => {
  console.log("Server is running at port 5000");
});
