const express = require("express");
const vendor = require("../controllers/vendor.controller");

const router = express.Router();

router.post('/register', vendor.registerVendor);

module.exports = router;
