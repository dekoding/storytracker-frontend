'use strict';

/* Controllers */

var storytrackerControllers = angular.module('storytrackerControllers', []);

storytrackerControllers.controller('StoryListCtrl', ['$scope', 'Story',
	function($scope, Story) {
		$scope.stories = Story.query();
		$scope.orderProp = 'title';
	}]);

storytrackerControllers.controller('StoryDetailCtrl', ['$scope', '$routeParams', 'Story',
	function($scope, $routeParams, Story) {
		$scope.story = Story.get({storyId: $routeParams.storyId});
	}]);

storytrackerControllers.controller('StoryAddCtrl', ['$scope', '$http',
	function($scope, $http) {
		$scope.newStory = function() {
			var data = $.param({
				json: JSON.stringify({
					title: $scope.newTitle
				})
			});
			console.log(data);
			$http.post("/stories", data)
			.success(function(data, status) {
				alert($scope.newTitle);
			})
			.error(alert("There was a problem."));
		}
	}]);