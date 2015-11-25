'use strict';

/* Application module */

var StoryTracker = angular.module('StoryTracker', [
  'ngRoute',
  'StoryTrackerAnimations',
  'StoryTrackerControllers',
  'StoryTrackerFilters',
  'StoryTrackerServices'
]);

StoryTracker.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/stories', {
        template: 'partials/story-list.html',
        controller: 'StoryListCtrl'
      }).
      when('/stories/:storyId', {
        template: 'partials/story-detail.html',
        controller: 'StoryDetailCtrl'
      }).
      otherwise({
        redirectTo: '/stories'
      });
  }
]);

/* Controllers */

var storytrackerControllers = angular.module('storytrackerControllers', []);

storytrackerControllers.controller('StoryListCtrl', ['$scope', 'Story',
  function($scope, Story) {
    $scope.id = 'id';
    $scope.stories = Story.query();
    $scope.orderProp = 'title';
    $scope.comments = 'comments';
  }]);

storytrackerControllers.controller('StoryDetailCtrl', ['$scope', '$routeParams', 'Story',
  function($scope, $routeParams, Story) {
    $scope.story = Story.get({storyId: $routeParams.storyId});
  }]);