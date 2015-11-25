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

	// Home page
	.when('/', {
		templateUrl : 'parts/home.html',
		controller  : 'mainController'
	})

	// About page
	.when('/about', {
		templateUrl : 'parts/about.html',
		controller  : 'aboutController'
	})

	// Documentation page
	.when('/docs', {
		templateUrl : 'parts/docs.html',
		controller  : 'docsController'
	})

	// Help page
	.when('/help', {
		templateUrl : 'parts/help.html',
		controller  : 'helpController'
	})

	// Login page
	.when('/login', {
		templateUrl : 'parts/login.html',
		controller  : 'loginController'
	})

	// Login page
	.when('/stories', {
		templateUrl : 'parts/stories.html',
		controller  : 'storiesController'
	})

	// Default to Home
	.otherwise({
		redirectTo: '/',
		controller: 'mainController'
	});;
});

StoryTracker.config(["$httpProvider", function ($httpProvider) {
     $httpProvider.defaults.transformResponse.push(function(responseData){
        convertDateStringsToDates(responseData);
        return responseData;
    });
}]);