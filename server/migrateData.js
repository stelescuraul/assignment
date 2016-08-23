'use strict';
var request = require('request');
var _ = require('lodash');
var q = require('q');

var db = require('./modules/databaseManager');
var sequelize = db.postgressConnect();
var Episodes = require('./models/episodes');

Episodes.drop().then(done => {
  console.log('Tables dropped');

  sequelize.sync().then(value => {
    console.log('Models migrated to db');
    request('http://api.tvmaze.com/singlesearch/shows?q=Futurama&embed=episodes', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var body = JSON.parse(body);
        var promises = [];

        _.forEach(body._embedded.episodes, function (episode) {
          promises.push(Episodes.create({
            image: episode.image.original,
            airDate: episode.airdate,
            airTime: episode.airtime,
            season: episode.season,
            number: episode.number,
            name: episode.name
          }));
        });

        q.all(promises).then(done => {
          console.log('Data inserted into db', '\nDone');
          process.exit(0);
        });
      } else {
        console.log('Request error', error);
        process.exit(0);
      };
    })
  }).catch(err => {
    console.log('Error');
    console.log(err);
    process.exit(0);
  });
}).catch(err => {
  console.log(err);
});
