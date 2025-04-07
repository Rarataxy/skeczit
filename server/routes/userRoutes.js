const express = require('express');
const roomController = require('../controllers/userController');
const router = express.Router();

router.get("/:user_id", userController.showUser)

router.post("/create", userController.createUser);

module.exports = router