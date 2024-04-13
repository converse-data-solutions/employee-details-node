const express = require("express");

const router = express.Router();

const empController = require("../controller/EmpController.js");

router.post("/addEmp", empController.addEmp);

router.get("/getAllEmp", empController.getAllEmp);

router.get("/getOne/:id", empController.getOne);

router.put("/update/:id", empController.updateEmp);

router.delete("/delete/:id", empController.deleteEmp);

module.exports = router;
