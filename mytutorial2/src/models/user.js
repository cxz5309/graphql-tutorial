const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
    }
  }
  User.init({
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    name: DataTypes.STRING,
    role: DataTypes.STRING,
    department: DataTypes.STRING,
    about: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true,
  });
  return User;
};