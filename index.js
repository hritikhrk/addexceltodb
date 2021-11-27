const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const config = require("./config");

const app = express();
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

// database
const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl).then(
  () => {
    /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
    console.log("Database connected.");
  },
  (err) => {
    /** handle initial connection error */
    console.log(err);
  }
);

app.get("/", (req, res) => {
  res.send("Server is running");
});

// creating server and running
app.listen(config.PORT, () => {
  console.log(`server is running at http://localhost:${config.PORT}`);
});
