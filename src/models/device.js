'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Device.belongsTo(models.Location,{foreignKey: 'locationID'})
    }
  };
  Device.init({
    deviceName: DataTypes.STRING,
    typeDevice: DataTypes.STRING,
    deviceId: DataTypes.INTEGER, 
    locationID: DataTypes.INTEGER, 
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Device',
  });
  return Device;
};