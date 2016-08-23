angular.module('starter')

.controller('EpisodeDetCtrl', function ($scope, $stateParams, storage) {
  storage.getEpisode($stateParams.episode).then(ep => {
      $scope.episode = ep;
    });
});
