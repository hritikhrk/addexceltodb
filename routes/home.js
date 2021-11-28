const express = require("express");
const router = express.Router();

router.route('/').get((req, res) => {
  res.render("home", { message: "Upload a .xls or .xlsx file here" });
});

module.exports = router;
