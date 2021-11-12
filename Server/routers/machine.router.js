const { Router } = require('express');
var express = require('express')
var router = express.Router();

const machineController = require("../controllers/machine.controller");



router.get("/:machineID",machineController.getMachineByID)
router.post("/:machineID/files/delete",machineController.deleteMachineFile)
router.post("/:machineID/files/upload",machineController.uploadMachineFile)

module.exports = router;