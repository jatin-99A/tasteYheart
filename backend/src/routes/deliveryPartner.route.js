const express = require("express");
const deliveryPartner = require("../controllers/deliveryPartner.controller");

const router = express.Router();

router.post('/register', deliveryPartner.registerDeliveryPartner);

module.exports = router;
