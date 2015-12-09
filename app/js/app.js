regexIso8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/;
function convertDateStringsToDates(input) {
    // Ignore things that aren't objects.
    if (typeof input !== "object") return input;

    for (var key in input) {
        if (!input.hasOwnProperty(key)) continue;

        var value = input[key];
        var match;
        // Check for string properties which look like dates.
        if (typeof value === "string" && (match = value.match(regexIso8601))) {
            var milliseconds = Date.parse(match[0])
            if (!isNaN(milliseconds)) {
            	var date = new Date(milliseconds);
    			var newdate = new Date(date);
    			newdate.setDate(newdate.getDate() + 1);
    			input[key] = newdate;
            }
        } else if (typeof value === "object") {
            // Recurse into object
            convertDateStringsToDates(value);
        }
    }
}

var StoryTracker = angular.module('StoryTracker', ['ngRoute', 'ngResource', 'ui.bootstrap']);

// Configure all routes
StoryTracker.config(function($routeProvider) {
	$routeProvider

	// About page
	.when('/about', {
		templateUrl : 'parts/about.html',
		controller  : 'aboutController'
	})

	// Stories page
	.when('/stories', {
		templateUrl : 'parts/stories.html',
		controller  : 'storiesController'
	})

	// Story page
	.when('/stories/:storyId', {
		templateUrl : 'parts/story.html',
		controller  : 'storyController'
	})

	// Submissions page
	.when('/stories/:storyId/submissions', {
		templateUrl : 'parts/subs.html',
		controller  : 'subsController'
	})

	// Submission details
	.when('/stories/:storyId/submissions/:subId', {
		templateUrl : 'parts/sub.html',
		controller  : 'subController'
	})

	// Readers page
	.when('/stories/:storyId/readers', {
		templateUrl : 'parts/readers.html',
		controller  : 'readersController'
	})

	// Reader details
	.when('/stories/:storyId/readers/:readerId', {
		templateUrl : 'parts/reader.html',
		controller  : 'readerController'
	})

	// Default to Home
	.otherwise({
		redirectTo: '/stories'
	});
});

StoryTracker.config(["$httpProvider", function ($httpProvider) {
     $httpProvider.defaults.transformResponse.push(function(responseData){
        convertDateStringsToDates(responseData);
        return responseData;
    });
}]);