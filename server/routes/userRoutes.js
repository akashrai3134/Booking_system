const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require('bcrypt')
const userController = require('../controller/userController');
const authMiddleware = require('../middlewares/authMiddleware')




router.post("/register", userController.Register);
router.post('/login' , userController.Login);
router.get("/get-current-user", authMiddleware, userController.getCurrentUser);

module.exports = router; 