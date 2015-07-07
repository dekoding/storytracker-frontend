'use strict';

/* Services */

var storytrackerServices = angular.module('storytrackerServices', ['ngResource']);

storytrackerServices.factory('Story', ['$resource',
	function($resource){
		return $resource('stories/:storyId.json', {}, {
			query: {method:'GET', params:{storyId:'stories'}, isArray:true}
		});
	}]);

