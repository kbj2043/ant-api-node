
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    nickName: DataTypes.STRING,
    authType: DataTypes.STRING,
    authId: DataTypes.STRING,
    passWord: DataTypes.STRING,
  }, {});
  user.associate = function (models) {
    // associations can be defined here
  };
  return user;
};
