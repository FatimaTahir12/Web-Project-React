const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes")
const bodyParser = require("body-parser")
const cors = require('cors')
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const { MONGO_URI } = process.env;


app.use(express.json());


mongoose.connect(
    "mongodb://projectadmin:admin@ac-mdbk4pf-shard-00-00.uqshvwe.mongodb.net:27017,ac-mdbk4pf-shard-00-01.uqshvwe.mongodb.net:27017,ac-mdbk4pf-shard-00-02.uqshvwe.mongodb.net:27017/project?ssl=true&replicaSet=atlas-149q8f-shard-0&authSource=admin&retryWrites=true&w=majority"
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
