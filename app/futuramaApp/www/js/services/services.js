angular.module('starter')

.service('storage', function ($http, $q) {
  var episodes = [];
  var counter = 1;

  var fillEpisodes = function () {
    return $http.get('http://localhost:1337/api/episodes/50/0').then(value => {
      var defer = $q.defer();
      episodes = value.data;
      defer.resolve(episodes);
      return defer.promise;
    }).catch(err => {
      console.log(err);
    })
  }

  var getEpisodes = function () {
    if (episodes.length === 0) {
      return fillEpisodes();
    } else {
      var defer = $q.defer();
      defer.resolve(episodes);
      return defer.promise;
    }
  };

  var findEpisode = function (id) {
    var promises = [];
    episodes.forEach(function (episode) {
      var defer = $q.defer();
      if (episode.id == id) {
        defer.resolve(episode);
        promises.push(defer.promise);
      }
    });
    return $q.all(promises).then(episode => {
      return episode[0];
    });
  };

  var getEpisode = function (id) {
    if (episodes.length === 0) {
      return fillEpisodes().then(res => {
        return findEpisode(id);
      }).catch(err => {
        console.log(err);
      })
    } else {
      return findEpisode(id);
    }
  }

  var loadMore = function () {
    if (episodes.length !== 0) {
      return $http.get('http://localhost:1337/api/episodes/25/' + episodes.length).then(ep => {
        var defer = $q.defer();
        episodes = episodes.concat(ep.data)
        defer.resolve(episodes);
        return defer.promise;
      });
    } else {
      return fillEpisodes();
    }
  }

  return {
    getEpisodes: getEpisodes,
    getEpisode: getEpisode,
    loadMore: loadMore
  }
});
