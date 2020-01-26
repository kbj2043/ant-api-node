
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    nickName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    authType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passWord: {
      type: DataTypes.STRING
    },
  }, {});
  user.associate = function (models) {
    // associations can be defined here
  };
  return user;
};
