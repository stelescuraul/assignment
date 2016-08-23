'use strict';
//Dependencies
var router = require('express').Router();
var _ = require('lodash');
var q = require('q');
var Episodes = require('./common/episodes');

//Get episodes
router.get('/episodes/:limit/:offset', function (req, res) {
  var offset = parseInt(req.params.offset);
  var limit = parseInt(req.params.limit);

  Episodes.getEpisodes(limit, offset).then(episodes => {
    res.status(200).send(episodes);
  }).catch(err => {
    res.status(err.code).send(err);
  });
});

module.exports = router;
