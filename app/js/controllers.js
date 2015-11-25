// create the controller and inject Angular's $scope
StoryTracker.controller('mainController', function($scope) {
	// create a message to display in our view
	$scope.message = 'StoryTracker: The authorship tool for the masses!';
	$scope.byline = 'Sign up today!';
});

StoryTracker.controller('aboutController', function($scope) {
	$scope.message = "StoryTracker is a simple, easy-to-use tool for maintaining control of your stories.";
	$scope.lead = "Track your word count, genre, degree of completion, and so much more. With an intuitive and responsive interface, forget about those difficult and unweildy spreadsheets you've been using";
	$scope.heading = {
		stories : "Keep track of your writing metadata",
		subs : "Track submissions, too!"
	};
	$scope.adverts = [
		{
			heading : "Statistics",
			text : "Maintain a running tally of the word count, and use it to determine suitable markets for stories"
		},
		{
			heading : "Genres",
			text : "Track, sort, organize, and filter stories on primary and secondary genres."
		},
		{
			heading : "Status",
			text : "Keep track of the writing, editing, and submission status of your stories, and receive alerts when a story that's ready for submission languishes too long."
		}
	];
	$scope.subverts = [
		{
			heading : "Tales in the Mail",
			text : "Track story submissions to individual markets.",
		},
		{
			heading : "Avoid mistakes",
			text : "Automatically exclude markets that stories are already at."
		},
		{
			heading : "Run reports",
			text : "Run reports on response time, sales, rejections, and more."
		}
	];
});

StoryTracker.controller('docsController', function($scope) {
	$scope.message = 'Coming soon!';
});

StoryTracker.controller('helpController', function($scope) {
	$scope.message = 'Coming soon!';
});

StoryTracker.controller('loginController', function($scope) {
	$scope.message = 'Coming soon!';
});

StoryTracker.controller('storiesController', function($scope, $uibModal, $filter, Story, StoriesList, Lists) {
	$scope.message = 'Story list';
	$scope.heading = 'Summary';

	$scope.dateFormat = function(date) {
	    var d = new Date(date),
	        month = '' + (d.getMonth() + 1),
	        day = '' + d.getDate(),
	        year = d.getFullYear();

	    if (month.length < 2) month = '0' + month;
	    if (day.length < 2) day = '0' + day;

	    return [year, month, day].join('-');
	}

	$scope.dateDifference = function(replyDate, subDate) {
		var date2 = new Date(replyDate);
    	var date1 = new Date(subDate);
    	var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    	var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    	$scope.days = diffDays;
    	return diffDays;
	}

	$scope.setTab = function(input) {
		if(input === "Finished") {
			return "subs";
		} else {
			return "story";
		}
	}
	$scope.days = '';

	$scope.genreList = Lists.genreList;
	$scope.statusList = Lists.statusList;
	$scope.responseList = Lists.responseList;
	$scope.storyLengthList = Lists.storyLengthList;

	// ID of story to expand details on
	$scope.expand = 'all';

	$scope.search = [];

	$scope.sortBy = 'title';
	$scope.sortReverse  = false;
	$scope.subSortBy = 'subDate';
	$scope.subSortReverse  = false;
	$scope.focus = 'nothing';

	$scope.stories = Story.storyList;

	$scope.updateStory = function(story, fieldName) {
		console.log("CHANGE: " + fieldName + " of story with id '" + story.storyId + "' has changed to " + story[fieldName] )
		var form = {
			"storyId" : story.storyId,
			"fieldName" : fieldName,
			"fieldContent" : story[fieldName],
			"fieldType" : "story",
			"mode" : "update"
		};
		Story.stories.update(form);
	}

	// New story dialog
	$scope.newStory = function() {
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'parts/dialogs/newstory.html',
			controller: 'NewStoryCtrl',
			size: 'lg'
		});
	}

	// Delete story dialog
	$scope.deleteStory = function(storyId) {
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'parts/dialogs/deletestory.html',
			controller: 'DelStoryCtrl',
			size: 'sm'
		});

		modalInstance.result.then(function(choice) {
			$scope.expand = 'all';
			console.log("Choice was: " + choice);
			if(choice === "delete") {
				var form = {
					"mode" : "deleteStory",
					"storyId" : storyId
				};
				Story.stories.delete(form);
				$scope.stories = $filter('StoryFilter')($scope.stories, {"storyId" : storyId});
			}
		});
	}
});

StoryTracker.controller('DelStoryCtrl', function($scope, $uibModalInstance) {
	$scope.YES = function() {
		$uibModalInstance.close("delete");
	}
	$scope.NO = function() {
		$uibModalInstance.close("cancel");
	}
});

StoryTracker.controller('NewStoryCtrl', function($scope, $uibModalInstance, Story, Lists) {
	$scope.genreList = Lists.genreList;
	$scope.statusList = Lists.statusList;
	$scope.OK = function(story) {
		var form = {
			"mode" : "addStory",
			"title" : story.title,
			"words" : story.words,
			"genre" : story.genre,
			"status" : story.status,
			"comments" :story.comments,
		}
		Story.add(form);
		$uibModalInstance.close();
	}
	$scope.CANCEL = function () {
		$uibModalInstance.dismiss('cancel');
	};
});