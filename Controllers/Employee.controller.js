const db = require('../Models/index.js')
const employee = db.employee

const addEmployee = async (req, res) => {
  const info = {
    name: req.body.name,
    emailAddress: req.body.emailAddress,
    status: req.body.status
  }
  const empEmail = info.emailAddress
  console.log(empEmail)

  function isValidEmail (empEmail) {
    const regex = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/
    return regex.test(empEmail);
}

  try {
    if (info.name === null || info.name === '') {
      console.log('Please check the Employee Name')
      res.status(406).send('Please check the Employee Name')
    } else if (
      info.emailAddress === null ||
      !isValidEmail(info.emailAddress) ||
      info.emailAddress === ''
    ) {
      console.log('Please check the Employee EmpMail')
      res.status(406).send('Please check the Employee EmpMail')
    } else if (info.status === null) {
      console.log('Please check the Employee Status')
      res.status(406).send('Please check the Employee Status')
    } else {
      const emp = await employee.create(info)
      res.status(201).send(emp)
    }
  } catch (err) {
    console.log('Error ' + err)
    res.status(404).send({ message: 'Not a page Found' })
  }
}
//  get all emp

const getAllEmployee = async (req, res) => {
  try {
    if (req.params.id === '' || req.params.id === null) {
      res.status(404).send('please give the id')
    } else {
      const emp = await employee.findAll({})
      if (emp.length < 0) {
        res.status(200).send('its empty')
      } else {
        res.status(200).send(emp)
      }
    }
  } catch (err) {
    console.log('Error check the url ' + err)
  }
}
//  get one emp
const getOneEmployee = async (req, res) => {
  try {
    if (req.params.id === '' || req.params.id === null) {
      res.status(404).send('please give the id')
    } else {
      const emp = await employee.findOne({ where: { id: req.params.id } })
      if (emp === null || emp === '') {
        res.status(200).send('no details found this id')
      } else {
        res.status(200).send(emp)
      }
    }
  } catch (err) {
    console.log('Error check the url ' + err)
    res.status(500).send('check the url')
  }
}
//  update emp
const updateEmployee = async (req, res) => {
  const info = {
    name: req.body.name,
    address: req.body.emailAddress,
    status: req.body.status
  }
  function isValidEmail (empEmail) {
      const regex = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/
      return regex.test(empEmail);
  }
  try {
    if (info.name === '' || info.name === null) {
      res.status(406).send('please check the name')
    } else if (
      info.address === '' ||
      info.address === null ||
      !isValidEmail(info.address)
    ) {
      res.status(406).send('please check the emailAddress')
    } else if (info.status === '' || info.status === null) {
      res.status(406).send('please fill the emp Status')
    } else {
      const emp = await employee.update(req.body, { where: { id: req.params.id } })
      res.status(200).send('its Updated ' + `${emp}`)
    }
  } catch (err) {
    res.status(404).send('check the url')
    console.log('check the url')
  }
}

//  delete emp
const deleteEmployee = async (req, res) => {
  try {
    if (req.params.id === '' || req.params.id === null) {
      res.status(404).send('give the deleted id')
    } else {
      await employee.destroy({ where: { id: req.params.id } })
      res.status(200).send(` id :  ${req.params.id}  is  deleted Sucessfully`)
    }
  } catch (err) {
    console.log('Error ' + err)
    res.status(500).send('Client side error')
  }
}
module.exports = {
  addEmployee,
  getAllEmployee,
  getOneEmployee,
  updateEmployee,
  deleteEmployee
}
