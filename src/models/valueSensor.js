'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class valueSensor extends Model {

    static associate(models) {
      // define association here
    }
  };
  valueSensor.init({
    temperature: DataTypes.STRING,
    humidity: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    time: DataTypes.TIME,
    locationID: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'valueSensor',
  });
  return valueSensor;
};