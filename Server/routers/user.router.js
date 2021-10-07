const { Router } = require('express');
var express = require('express')
var router = express.Router();

const userController = require("../controllers/user.controller");


router.post("/authenticate",userController.authenticateUser);
router.get("/:userID/machines",userController.getUserMachines)

module.exports = router;