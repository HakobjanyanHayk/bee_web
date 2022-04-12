'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        File.belongsTo(models.User,{
            as: 'owner',
            foreignKey: {
                name: 'userId',
                allowNull: false,
                type: DataTypes.UUID
            }
        })
    }
  }
  File.init({
    userId: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'File',
  });
  return File;
};
