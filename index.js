const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");

// importing files
const config = require("./config");
const homeRouter = require("./routes/home");
const exportRouter = require("./routes/export");

const app = express();

app.use(express.json());
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

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/", homeRouter);
app.use("/api/export", exportRouter);

// creating server and running
app.listen(config.PORT, () => {
  console.log(`server is running at http://localhost:${config.PORT}`);
});
