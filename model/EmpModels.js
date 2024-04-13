module.exports = (sequelize, DataTypes) => {
  const Emp = sequelize.define("employ", {
    EmpName: {
      type: DataTypes.STRING,
      ALLOWNULL: false,
    },
    EmpAddress: {
      type: DataTypes.STRING,
      ALLOWNULL: false,
    },
    EmpStatus: {
      type: DataTypes.STRING,
      ALLOWNULL: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  });
  return Emp;
};
