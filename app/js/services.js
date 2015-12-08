StoryTracker.factory("Story", function($resource) {
	var service = {};

	service.stories = $resource("/stories/:storyId", { storyId: '@storyId' }, {
		"get":{
			method: 'GET'
		},
		"update":{
			method: 'PUT'
		},
		"add":{
			method: 'POST'
		},
		"delete":{
			method: 'DELETE'
		}
	});
	return service;
});

StoryTracker.factory("Submission", function($resource) {
	var service = {};

	service.submissions = $resource("/stories/:storyId/submissions/:subId", { storyId: '@storyId', subId: '@subId' }, {
		"get":{
			method: 'GET'
		},
		"update":{
			method: 'PUT'
		},
		"add":{
			method: 'POST'
		},
		"delete":{
			method: 'DELETE'
		}
	});
	return service;
});

StoryTracker.factory("Reader", function($resource) {
	var service = {};

	service.readers = $resource("/stories/:storyId/readers/:readerId", { storyId: '@storyId', readerId: '@readerId' }, {
		"get":{
			method: 'GET'
		},
		"update":{
			method: 'PUT'
		},
		"add":{
			method: 'POST'
		},
		"delete":{
			method: 'DELETE'
		}
	});
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