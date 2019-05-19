const mongoose = require("mongoose");
const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require("path");

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database

const dbRoute = "mongodb+srv://dbAriel:biologiatotal@arielcluster-fpdcz.mongodb.net/test?retryWrites=true";

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

const db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

require('./controllers/alunos_controller.js')(router);
require('./controllers/cursos_controller.js')(router);
require('./controllers/matriculas_controller.js')(router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../frontend/build"))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  })
}
app.use("/api", router);  

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));