const { where } = require("sequelize");
const db = require("../model/index.js");
const Emp = db.Emp;

const addEmp = async (req, res) => {
  let info = {
    EmpName: req.body.EmpName,
    EmpAddress: req.body.EmpAddress,
    EmpStatus: req.body.EmpStatus,
  };
  const empEmail = info.EmpAddress;
  console.log(empEmail);

  function isValidEmail(empEmail) {
    const emailRegex =
      /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;
    return emailRegex.test(empEmail);
  }

  try {
    if (info.EmpName === null || info.EmpName === "") {
      console.log("Please check the Employee Name");
      res.status(406).send("Please check the Employee Name");
    } else if (
      info.EmpAddress === null ||
      !isValidEmail(info.EmpAddress) ||
      info.EmpAddress === ""
    ) {
      console.log("Please check the Employee EmpMail");
      res.status(406).send("Please check the Employee EmpMail");
    } else if (info.EmpStatus === null) {
      console.log("Please check the Employee Status");
      res.status(406).send("Please check the Employee Status");
    } else {
      const emp = await Emp.create(info);
      res.status(201).send(emp);
    }
  } catch (err) {
    console.log("Error " + err);
    res.status(404).send({ message: "Not a page Found" });
  }
};
//get all emp

const getAllEmp = async (req, res) => {
  try {
    if (req.params.id === "" || req.params.id === null) {
      res.status(404).send("please give the id");
    } else {
      let emp = await Emp.findAll({});
      if (emp.length < 0) {
        res.status(200).send("its empty");
      } else {
        res.status(200).send(emp);
      }
    }
  } catch (err) {
    console.log("Error check the url " + err);
  }
};

//get one emp
const getOne = async (req, res) => {
  try {
    if (req.params.id === "" || req.params.id === null) {
      res.status(404).send("please give the id");
    } else {
      let emp = await Emp.findOne({ where: { id: req.params.id } });
      if (emp === null || emp === "") {
        res.status(200).send("no details found this id");
      } else {
        res.status(200).send(emp);
      }
    }
  } catch (err) {
    console.log("Error check the url " + err);
    res.status(500).send("check the url");
  }
};
//update emp
const updateEmp = async (req, res) => {
  let info = {
    EmpName: req.body.EmpName,
    EmpAddress: req.body.EmpAddress,
    EmpStatus: req.body.EmpStatus,
  };
  function isValidEmail(empEmail) {
    const emailRegex =
      /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;
    return emailRegex.test(empEmail);
  }
  try {
    if (info.EmpName === "" || info.EmpName === null) {
      res.status(406).send("please check the name");
    } else if (
      info.EmpAddress === "" ||
      info.EmpAddress === null ||
      !isValidEmail(info.EmpAddress)
    ) {
      res.status(406).send("please check the emailAddress");
    } else if (info.EmpStatus === "" || info.EmpStatus === null) {
      res.status(406).send("please fill the emp Status");
    } else {
      let emp = await Emp.update(req.body, { where: { id: req.params.id } });
      res.status(200).send("its Updated");
    }
  } catch (err) {
    res.status(404).send("check the url");
    console.log("check the url");
  }
};

//delete emp
const deleteEmp = async (req, res) => {
  try {
    if (req.params.id === "" || req.params.id === null) {
      res.status(404).send("give the deleted id");
    } else {
      await Emp.destroy({ where: { id: req.params.id } });
      res.status(200).send(` id :  ${req.params.id}  is  deleted Sucessfully`);
    }
  } catch (err) {
    console.log("Error " + err);
    res.status(500).send("Client side error");
  }
};
module.exports = {
  addEmp,
  getAllEmp,
  getOne,
  updateEmp,
  deleteEmp,
};
