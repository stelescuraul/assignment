'use strict';
var Episodes = require('../../../models/episodes');
var sequelize = require('../../../modules/databaseManager').postgressConnect();

var q = require('q');
var _ = require('lodash');

var functions = {
  getEpisodes: function (limit, offset) {
    return Episodes.findAll({
      limit: limit,
      offset: offset,
      order: [
        ["id", "ASC"]
      ]
    });
  }
};

module.exports = functions;
