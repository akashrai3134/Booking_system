const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require('bcrypt')

const userController = require('../controller/userController');


router.post("/register", userController.Register);
router.post('/login' , userController.Login)

module.exports = router;