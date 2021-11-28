const express = require("express");
const router = express.Router();
const exportController = require('./../controllers/export')

router.route('/').post(exportController);

module.exports = router;
