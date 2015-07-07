'use strict';

/* Application module */

var storytrackerApp = angular.module('storytrackerApp', [
  'ngRoute',
  'storytrackerAnimations',
  'storytrackerControllers',
  'storytrackerFilters',
  'storytrackerServices'
]);

storytrackerApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/stories', {
        templateUrl: 'partials/story-list.html',
        controller: 'StoryListCtrl'
      }).
      when('/stories/:storyId', {
        templateUrl: 'partials/story-detail.html',
        controller: 'StoryDetailCtrl'
      }).
      otherwise({
        redirectTo: '/stories'
      });
  }]);