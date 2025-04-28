const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get("/:username", userController.showUserDetails)

router.post("/create", userController.createUser);

router.post("/login", userController.loginUser);

router.post("/guest", userController.guestLogin)

module.exports = router