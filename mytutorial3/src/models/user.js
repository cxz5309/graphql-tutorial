const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
    }
  }
  User.init({
    providerId: DataTypes.STRING,
    name: DataTypes.STRING,
    role: DataTypes.STRING,
    department: DataTypes.STRING,
    email: DataTypes.STRING,
    about: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true,
  });
  return User;
};
