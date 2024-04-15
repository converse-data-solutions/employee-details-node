const express = require('express')

const router = express.Router()

const empController = require('../Controllers/Employee.controller.js')

router.post('/addEmp', empController.addEmployee)

router.get('/getAllEmp', empController.getAllEmployee)

router.get('/getOne/:id', empController.getOneEmployee)

router.put('/update/:id', empController.updateEmployee)

router.delete('/delete/:id', empController.deleteEmployee)

module.exports = router
