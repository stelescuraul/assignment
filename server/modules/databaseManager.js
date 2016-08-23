'use strict';
//Dependencies
var config = require('../config');
var Sequelize = require('sequelize');

var sequelize = new Sequelize(config.postgresConfig('assignment'), {
  logging: false
});

var postgressConnect = function () {
  return sequelize;
};

module.exports = {
  postgressConnect: postgressConnect
};
