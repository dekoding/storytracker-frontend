StoryTracker.controller('mainController', function($scope) {
	$scope.message = 'StoryTracker:';
	$scope.byline = 'The authorship tool for tracking your stories.';
});

StoryTracker.controller('aboutController', function($scope) {
	$scope.message = "StoryTracker is a simple, easy-to-use tool for maintaining control of your stories.";
	$scope.lead = "Track your word count, genre, degree of completion, and so much more. With an intuitive and responsive interface, forget about those difficult and unweildy spreadsheets you've been using";
	$scope.heading = {
		stories : "Keep track of your writing metadata",
		subs : "Track submissions, too!",
		readers : "Track notes and comments from early readers!"
	};
	$scope.adverts = [
		{
			heading : "Statistics",
			text : "Maintain a running tally of the word count, and use it to determine suitable markets for stories"
		},
		{
			heading : "Genres",
			text : "Track, sort, organize, and filter stories on genres."
		},
		{
			heading : "Status",
			text : "Keep track of the writing, editing, and submission status of your stories."
		}
	];
	$scope.subverts = [
		{
			heading : "Tales in the Mail",
			text : "Track story submissions to individual markets.",
		},
		{
			heading : "Avoid mistakes",
			text : "Automatically see which stories are already in the mail."
		}
	];
	$scope.readerverts = [
		{
			heading : "Early readers",
			text : "Keep track of names, dates, and comments of your story's early readers.",
		},
		{
			heading : "Bring to critique groups",
			text : "Keep logs of your critique group's comments about your stories."
		}
	];
});

// Story controllers
StoryTracker.controller('storiesController', function($scope, $uibModal, $filter, Story, Lists) {
	$scope.heading = 'Summary';

	$scope.subStatus = function(submitted, status) {
		if(submitted) {
			return "success"; // Returns Bootstrap 'success' class to color the row green.
		} else if(status === "Finished") {
			return "danger"; // Returns Bootstrap 'danger' class to inform the user that a story is ready for submission
		} else {
			return null;
		}
	}
	$scope.days = '';

	$scope.genreList = Lists.genreList;
	$scope.statusList = Lists.statusList;
	$scope.storyLengthList = Lists.storyLengthList;

	$scope.search = [];

	$scope.sortBy = 'title';
	$scope.sortReverse  = false;
	$scope.subSortBy = 'subDate';
	$scope.subSortReverse  = false;
	$scope.stories = Story.stories.query();
	$scope.storyCount = $scope.stories.length;

	$scope.updateStory = function(story) {
		Story.stories.update(story);
	}

	// New story dialog
	$scope.newStory = function() {
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'parts/dialogs/newstory.html',
			controller: 'NewStoryCtrl',
			size: 'lg'
		});
		modalInstance.result.then(function() {
			$scope.stories = Story.stories.query();
		});
	}
});

StoryTracker.controller('storyController', function($scope, $uibModal, $routeParams, $window, Story, Lists) {
	$scope.story = Story.stories.get({storyId: $routeParams.storyId});
	$scope.genreList = Lists.genreList;
	$scope.statusList = Lists.statusList;
	$scope.showFilters = false;
	$scope.updateStory = function(story) {
		Story.stories.update(story);
	}
	$scope.deleteStory = function() {
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'parts/dialogs/deletestory.html',
			controller: 'DelStoryCtrl',
			size: 'sm'
		});
		modalInstance.result.then(function(choice) {
			if(choice === "delete") {
				Story.stories.delete($scope.story);
				$window.location.href = '/#/stories';
			}
		});
	}
});

StoryTracker.controller('NewStoryCtrl', function($scope, $uibModalInstance, Story, Lists) {
	$scope.genreList = Lists.genreList;
	$scope.statusList = Lists.statusList;
	$scope.OK = function(story) {
		Story.stories.add(story);
		$uibModalInstance.close();
	}
	$scope.CANCEL = function () {
		$uibModalInstance.dismiss('cancel');
	};
});

StoryTracker.controller('DelStoryCtrl', function($scope, $uibModalInstance) {
	$scope.YES = function() {
		$uibModalInstance.close("delete");
	}
	$scope.NO = function() {
		$uibModalInstance.close("cancel");
	}
});

// Submission controllers
StoryTracker.controller('subsController', function($scope, $uibModal, $routeParams, Submission, Lists) {
	$scope.responseList = Lists.responseList;
	$scope.sortBy = 'subDate';

	$scope.updateSub = function(sub) {
		sub.storyId = $routeParams.storyId;
		Submission.submissions.update(sub);
	}
	// New sub dialog
	$scope.newSub = function(Id) {
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'parts/dialogs/newsub.html',
			controller: 'NewSubCtrl',
			size: 'lg',
			resolve: {
				storyId: function() {
					return Id;
        		}
        	}
		});
		modalInstance.result.then(function() {
			$scope.submissions = Submission.submissions.get({storyId: $routeParams.storyId});
		});
	}
	$scope.submissions = Submission.submissions.get({storyId: $routeParams.storyId});
});

StoryTracker.controller('subController', function($scope, $uibModal, $routeParams, $window, Submission, Lists) {
	$scope.responseList = Lists.responseList;
	$scope.submission = Submission.submissions.get({storyId: $routeParams.storyId, subId: $routeParams.subId});
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
    	return diffDays;
	}

	$scope.days = '';

	$scope.updateSub = function(sub) {
		Submission.submissions.update(sub);
		$scope.days = $scope.dateDifference(sub.replyDate, sub.subDate)
	}
	$scope.deleteSub = function(sub) {
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'parts/dialogs/deletesub.html',
			controller: 'DelSubCtrl',
			size: 'sm'
		});
		modalInstance.result.then(function(choice) {
			if(choice === "delete") {
				Submission.submissions.delete(sub);
				$window.location.href = '/#/stories/' + sub.storyId + '/submissions/';
			}
		});
	}
})

StoryTracker.controller('NewSubCtrl', function($scope, $uibModalInstance, Submission, Lists, storyId) {
	$scope.responseList = Lists.responseList;
	$scope.OK = function(sub) {
		var form = {
			"storyId" : storyId,
			"market" : sub.market,
			"subDate" : sub.subDate,
			"replyDate" : sub.replyDate,
			"response" : sub.response,
			"comment" : sub.comment,
		}
		Submission.submissions.add(form);
		$uibModalInstance.close();
	}
	$scope.CANCEL = function () {
		$uibModalInstance.dismiss('cancel');
	};
});

StoryTracker.controller('DelSubCtrl', function($scope, $uibModalInstance) {
	$scope.YES = function() {
		$uibModalInstance.close("delete");
	}
	$scope.NO = function() {
		$uibModalInstance.close("cancel");
	}
});

// Reader controllers
StoryTracker.controller('readersController', function($scope, $uibModal, $routeParams, Reader) {
	$scope.sortBy = 'readDate';

	$scope.updateReader = function(reader) {
		reader.storyId = $routeParams.storyId;
		Reader.readers.update(reader);
	}
	// New sub dialog
	$scope.newReader = function(Id) {
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'parts/dialogs/newreader.html',
			controller: 'NewReaderCtrl',
			size: 'lg',
			resolve: {
				storyId: function() {
					return Id;
        		}
        	}
		});
		modalInstance.result.then(function() {
			$scope.readers = Reader.readers.get({storyId: $routeParams.storyId});
		});
	}
	$scope.readers = Reader.readers.get({storyId: $routeParams.storyId});
});

StoryTracker.controller('readerController', function($scope, $uibModal, $routeParams, $window, Reader) {
	$scope.reader = Reader.readers.get({storyId: $routeParams.storyId, readerId: $routeParams.readerId});

	$scope.updateReader = function(reader) {
		Reader.readers.update(reader);
	}
	$scope.deleteReader = function(reader) {
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'parts/dialogs/deletereader.html',
			controller: 'DelReaderCtrl',
			size: 'sm'
		});
		modalInstance.result.then(function(choice) {
			if(choice === "delete") {
				Reader.readers.delete(reader);
				$window.location.href = '/#/stories/' + reader.storyId + '/readers/';
			}
		});
	}
})

StoryTracker.controller('NewReaderCtrl', function($scope, $uibModalInstance, Reader, storyId) {
	$scope.OK = function(reader) {
		var form = {
			"storyId" : storyId,
			"name" : reader.name,
			"readDate" : reader.readDate,
			"comment" : reader.comment,
		}
		Reader.readers.add(form);
		$uibModalInstance.close();
	}
	$scope.CANCEL = function () {
		$uibModalInstance.dismiss('cancel');
	};
});

StoryTracker.controller('DelReaderCtrl', function($scope, $uibModalInstance) {
	$scope.YES = function() {
		$uibModalInstance.close("delete");
	}
	$scope.NO = function() {
		$uibModalInstance.close("cancel");
	}
});