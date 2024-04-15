module.exports = (sequelize, DataTypes) => {
  const employee = sequelize.define('employees', {
    name: {
      type: DataTypes.STRING,
      ALLOWNULL: false
    },
    emailAddress: {
      type: DataTypes.STRING,
      ALLOWNULL: false
    },
    status: {
      type: DataTypes.STRING,
      ALLOWNULL: false
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  })
  return employee
}
