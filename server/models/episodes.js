'use strict';
var Sequelize = require('sequelize');
var sequelize = require('../modules/databaseManager').postgressConnect();
var schema = require('./schemas').episodes();

var Episodes = sequelize.define('episodes', schema);

module.exports = Episodes;
