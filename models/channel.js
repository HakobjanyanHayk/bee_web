'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Channel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        Channel.belongsTo(models.User, {
            as: 'author',
            foreignKey: {
                name: 'createdBy',
                allowNull: false,
                type: DataTypes.UUID
            }
        })
        Channel.belongsTo(models.Workspace, {
            as: 'workspace',
            foreignKey: {
                name: 'workspaceId',
                allowNull: false,
                type: DataTypes.UUID
            }
        })
    }
  }
  Channel.init({
    createdBy: DataTypes.INTEGER,
    workspaceId: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Channel',
  });
  return Channel;
};
