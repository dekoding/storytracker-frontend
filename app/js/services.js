StoryTracker.factory("Story", function($resource, $http) {
	var service = {};

	service.stories = $resource("/api/stories:id", {}, {
		"get":{
			method: 'GET'
		},
		"update":{
			method: 'POST'
		},
		"add":{
			method: 'POST'
		},
		"delete":{
			method: 'POST',
			isArray: true
		}
	});

	service.storyList = service.stories.query();

	service.add = function(story) {
		$http.post('/api/stories', story)
		.success(function(data) {
			console.log(data);
			service.storyList.push(data);
		})
		.error(function(data) {
			console.log(data);
		});
	}

	service.addSub = function(sub) {
		$http.post('/api/stories', sub)
		.success(function(data) {
			console.log(data);
			angular.forEach(service.storyList, function(story) {
				console.log(story.storyId);
			});
		});
	}
	return service;
});

StoryTracker.factory("StoriesList", function($resource) {
	var service = {};
	service.stories = $resource("/api/stories:id");
    return service;
});

StoryTracker.factory('Lists', function() {
	var Lists = {
		genreList : [
			{id : "Adventure", name : "Adventure"},
			{id : "Crime/Detective", name : "Crime/Detective"},
			{id : "Fantasy", name : "Fantasy"},
			{id : "Horror", name : "Horror"},
			{id : "Literary", name : "Literary"},
			{id : "Magical Realism", name : "Magical Realism"},
			{id : "Mainstream", name : "Mainstream"},
			{id : "Mystery", name : "Mystery"},
			{id : "Sci-Fi", name : "Sci-Fi" },
			{id : "Slipstream", name : "Slipstream" },
			{id : "Surreal", name : "Surreal"},
			{id : "Thriller", name : "Thriller"},
			{id : "Western", name : "Western"}
		],
		statusList : [
			{id : "Unfinished", name: "Unfinished"},
			{id : "First Draft", name: "First Draft"},
			{id : "Revisions", name: "Revisions"},
			{id : "Finished", name: "Finished"},
			{id : "Trunk", name: "Trunk"}
		],
		responseList : [
			{id : "Waiting", name: "Waiting"},
			{id : "Rejected", name: "Rejected"},
			{id : "Sold", name: "Sold"}
		],
		storyLengthList : [
			{id : "Flash: < 1000", name: "Flash"},
			{id : "Short: 1000-7499", name: "Short"},
			{id : "Novelette: 7500-17499", name: "Novelette"},
			{id : "Novella: 17500-39999", name: "Novella"},
			{id : "Novel: 40000 and up", name: "Novel"}
		]
	}
	return Lists;
});