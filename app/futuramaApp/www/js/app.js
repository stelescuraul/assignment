angular.module('starter', ['ionic'])

.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('episodes', {
      url: '/episodes',
      views: {
        'episodes@': {
          templateUrl: 'templates/episode-list.html',
          controller: 'EpisodesCtrl'
        }
      }
    })
    .state('episodes.details', {
      url: '/:episode',
      views: {
        'episodes@': {
          templateUrl: 'templates/episode-details.html',
          controller: 'EpisodeDetCtrl'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/episodes');

});
