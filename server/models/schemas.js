'use strict';
var Sequelize = require('sequelize');
var moment = require('moment');
var schemas = {
  episodes: function () {
    var episode = {
      image: {
        type: Sequelize.STRING,
        allowNull: false
      },
      airDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        get: function () {
          return moment(this.getDataValue('airDate')).format('YYYY-MM-DD');
        }
      },
      airTime: {
        type: Sequelize.TIME,
        allowNull: false
      },
      season: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    };
    return episode;
  }
};

module.exports = schemas;
