'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        User.hasMany(models.Workspace,{
            as: 'workspaces',
            foreignKey: {
                name: 'createdBy',
                allowNull: false,
                type: DataTypes.UUID
            }
        })
        User.hasMany(models.Channel,{
            as: 'channels',
            foreignKey: {
                name: 'createdBy',
                allowNull: false,
                type: DataTypes.UUID
            }
        })
        User.belongsToMany(models.Workspace, {
            as: 'groups',
            through: 'WorkspaceUsers',
            foreignKey: {
                name: 'userId',
                allowNull: false,
                type: DataTypes.UUID
            }
        });
    }
  }
  User.init({
    name: DataTypes.STRING,
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
