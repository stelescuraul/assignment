angular.module('starter')

.controller('EpisodesCtrl', function ($scope, storage) {
  $scope.hasMoreData = true;
  storage.getEpisodes().then(value => {
    $scope.episodes = value;
  });

  $scope.loadMore = function () {
    storage.loadMore().then(done => {
      if(done.length === $scope.episodes.length) $scope.hasMoreData = false;
      $scope.episodes = done;
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };

});
