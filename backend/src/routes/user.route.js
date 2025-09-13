const express = require('express');
const user = require("../controllers/user.controller")

const router = express.Router();

// user auth APIs
router.post('/register', user.registerUser)
router.post('/login', user.loginUser)
router.get('/logout', user.logoutUser)




module.exports = router;