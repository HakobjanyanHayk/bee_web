'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Workspace extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        Workspace.belongsTo(models.User, {
            as: 'author',
            foreignKey: {
                name: 'userId',
                allowNull: false,
                type: DataTypes.UUID
            }
        })
    }
  }
  Workspace.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Workspace',
  });
  return Workspace;
};
