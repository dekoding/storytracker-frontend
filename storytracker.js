var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoOp = require("./models/mongo.js");
var router = express.Router();
var uuid = require('node-uuid');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));
app.use(express.static('app'));

var utilities = {
	timeStamp : function() {
		var now = new Date();

		// Create an array with the current month, day and time
		var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];

		// Create an array with the current hour, minute and second
		var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];

		// Determine AM or PM suffix based on the hour
		var suffix = ( time[0] < 12 ) ? "AM" : "PM";

		// Convert hour from military time
		time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;

		// If hour is 0, set it to 12
		time[0] = time[0] || 12;

		// If seconds and minutes are less than 10, add a zero
		for ( var i = 1; i < 3; i++ ) {
			if ( time[i] < 10 ) {
				time[i] = "0" + time[i];
			}
		}

		// Return the formatted string
		return date.join("/") + " " + time.join(":") + " " + suffix;
	},
	log: function(type, message) {
		console.log(this.timeStamp() + ": " + type + ": " + message);
	},
	dateDifference : function(replyDate, subDate) {
		var date2 = new Date(replyDate);
    	var date1 = new Date(subDate);
    	var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    	var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    	return diffDays;
    }
}

// Stories
router.route("/stories")
.get(function(req,res){
	utilities.log("MESSAGE", "Client requested stories list");
	var response = [];
	mongoOp.find({},function(err,data){
		if(err) {
			utilities.log("ERROR", "Failed to get stories list");
			response = {"error" : true,"message" : "Error fetching data"};
		} else {
			utilities.log("MESSAGE", "Request successful.");
			data.forEach(function(story){
				var subCount = story.submissions.length;
				var readerCount = story.readers.length;
				var submitted = false;
                var sold = false;
				story.submissions.forEach(function(submission) {
					if(submission.response === "Waiting") {
						submitted = true;
					}
                    if(submission.response === "Sold") {
                        sold = true;
                    }
				});
				response.push({
					"storyId" : story.storyId,
					"title" : story.title,
					"words" : +story.words,
					"genre" : story.genre,
					"status" : story.status,
					"comments" : story.comments,
					"subCount" : subCount,
					"readerCount" : readerCount,
					"submitted" : submitted,
                    "sold" : sold
				});
			});
		}
		res.json(response);
	});
})
.post(function(req,res) {
	utilities.log("MESSAGE", "Client adding story '" + req.body.title + "'");
	var db = new mongoOp();
	var response = {};

	var storyId = uuid.v4();

	db.storyId = storyId;   
	db.title = req.body.title;
	db.words = req.body.words; 
	db.genre = req.body.genre;
	db.status = req.body.status;
	db.comments = req.body.comments;
	db.save(function(err) {
		if(err) {
            utilities.log("ERROR", "Adding story '" + req.body.title + "' FAILED");
			response = {"error" : true,"message" : "Error adding data"};
		} else {
            utilities.log("MESSAGE", "Adding story '" + req.body.title + "' SUCCEEDED");
			response['error'] = false;
			response['data'] = [{
				"storyId" : storyId
			}];
		}
		res.json(response);
	});
});

router.route("/stories/:storyId")
.get(function(req,res){
    utilities.log("MESSAGE", "Client requested story: " + req.params.storyId);
    var response = {};
    mongoOp.findOne({ "storyId" : req.params.storyId },function(err,data){
        if(err) {
            utilities.log("ERROR", "Failed to get story: " + req.params.storyId);
            response = {"error" : true,"message" : "Error fetching data"};
        } else {
        	utilities.log("MESSAGE", "Request successful.");
        	var waiting = 0;
        	var rejected = 0;
        	var sold = 0;
        	var market = "none";
        	var averageArray = [];
        	if(data.submissions !== undefined) {
	        	data.submissions.forEach(function(submission) {
	        		if(submission.response === "Waiting") {
	        			waiting += 1;
	        			market = submission.market;
	        			var today = new Date();
	        			averageArray.push(utilities.dateDifference(today, submission.subDate));
	        		}
	        		if(submission.response === "Rejected") {
	        			rejected += 1;
	        			averageArray.push(utilities.dateDifference(submission.replyDate, submission.subDate));
	        		}
	        		if(submission.response === "Sold") {
	        			sold += 1;
	        			averageArray.push(utilities.dateDifference(submission.replyDate, submission.subDate));
	        		}
	        	});
	        	var subCount = data.submissions.length;
	        } else {
	        	var subCount = 0;
	        }
	        if(averageArray.length > 0) {
	        	var total = 0;
	        	for(var i = 0; i < averageArray.length; i++) {
	        		total += +averageArray[i];
	        	}
	        	var average = Math.floor(total / averageArray.length);
	        } else {
	        	var average = 0;
	        }
	        if(data.readers !== undefined) {
	        	readerCount = data.readers.length;
	        } else {
	        	readerCount = 0;
	        }
        	var available = true;
        	if(waiting >= 1) {
        		available = false;
        	}
        	var response = {
        		"storyId" : data.storyId,
        		"title" : data.title,
        		"words" : +data.words,
        		"genre" : data.genre,
        		"status" : data.status,
        		"comments" : data.comments,
        		"subCount" : subCount,
        		"readerCount" : readerCount,
        		"waiting" : waiting,
        		"rejected" : rejected,
        		"sold" : sold,
        		"available" : available,
        		"market" : market,
        		"average" : average
        	};
        }
        res.json(response);
    });
})
.put(function(req,res){
    utilities.log("MESSAGE", "Client updating story: " + req.params.storyId);
    var response = {};
    mongoOp.findOne({ "storyId" : req.params.storyId },function(err,data){
        if(err) {
            utilities.log("ERROR", "Update failed for story: " + req.params.storyId);
            response = {"error" : true,"message" : "Error fetching data"};
            res.json(response);
        } else {
            if(req.body.title !== undefined) { data.title = req.body.title; }
            if(req.body.words !== undefined) { data.words = req.body.words; }
            if(req.body.genre !== undefined) { data.genre = req.body.genre; }
            if(req.body.status !== undefined) { data.status = req.body.status; }
            if(req.body.comments !== undefined) { data.comments = req.body.comments; }
            data.save(function(err){
                if(err) {
                    utilities.log("ERROR", "Update failed for story: " + req.params.storyId);
                    response = {"success": false};
                } else {
                    utilities.log("MESSAGE", "Update succeeded for story: " + req.params.storyId);
                    response = {"success": true};
                }
                res.json(response);
            })
        }
    });
})
.delete(function(req,res){
    utilities.log("MESSAGE", "Client deleting story: " + req.params.storyId);
    var response = {};
    mongoOp.findOne({ "storyId" : req.params.storyId },function(err,data){
        if(err) {
            utilities.log("ERROR", "Delete failed for story: " + req.params.storyId);
            response = {"error" : true,"message" : "Error fetching data"};
            res.json(response);
        } else {
            mongoOp.remove({ "storyId" : req.params.storyId},function(err){
                if(err) {
                    utilities.log("ERROR", "Delete failed for story: " + req.params.storyId);
                    response = {"error" : true,"message" : "Error deleting data"};
                } else {
                    utilities.log("MESSAGE", "Delete succeeded for story: " + req.params.storyId);
                    response = {"error" : false,"message" : "Story deleted"};
                }
                res.json(response);
            });
        }
    });
});

// Submissions
router.route("/stories/:storyId/submissions")
.get(function(req,res){
	utilities.log("MESSAGE", "Client requested submissions list");
	mongoOp.findOne({ "storyId" : req.params.storyId },function(err,data){
		if(err) {
			utilities.log("ERROR", "Failed to get submissions list");
			response = {"error" : true,"message" : "Error fetching data"};
		} else {
            utilities.log("MESSAGE", "Request successful.");
			var response = {};
			response['storyId'] = data.storyId;
			response['title'] = data.title;
			response['submissions'] = [];
			response['subCount'] = data.submissions.length;

			data.submissions.forEach(function(submission) {
				response.submissions.push({
					"subId" : submission.subId,
					"market" : submission.market,
					"subDate" : submission.subDate,
					"replyDate" : submission.replyDate,
					"response" : submission.response,
					"comment" : submission.comment
				});
			});
		}
		res.json(response);
	});
})
.post(function(req,res) {
    utilities.log("MESSAGE", "Client adding submission to story: '" + req.params.storyId + "'");
	mongoOp.findOne({ "storyId" : req.params.storyId },function(err,data){
        if(err) {
            utilities.log("ERROR", "Adding submission to story '" + req.params.storyId + "' FAILED");
            response = {"error" : true,"message" : "Error fetching data"};
            res.json(response);
        } else {
        	var subId = uuid.v4();
            data.submissions.push({
            	"subId" : subId,
            	"market" : req.body.market,
				"subDate" : req.body.subDate,
				"replyDate" : req.body.replyDate,
				"response" : req.body.response,
				"comment" : req.body.comment
			});
            data.save(function(err){
                if(err) {
                    utilities.log("ERROR", "Adding submission to story '" + req.params.storyId + "' FAILED");
                    response = {"error" : true,"message" : "Error updating data"};
                } else {
                    utilities.log("MESSAGE", "Adding submission to story '" + req.params.storyId + "' SUCCEEDED");
                    response = {"error" : false,"message" : "Data is updated for " + req.params.storyId};
                }
                res.json(response);
            });
        }
    });
});

router.route("/stories/:storyId/submissions/:subId")
.get(function(req,res){
    var response = {};
    mongoOp.findOne({ "storyId" : req.params.storyId, "submissions.subId" : req.params.subId }, function(err,data) {
        if(err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else {
        	data.submissions.forEach(function(submission) {
        		if(submission.subId === req.params.subId) {
        			response = {
        				"storyId" : req.params.storyId,
        				"title" : data.title,
        				"subId" : req.params.subId,
        				"market" : submission.market,
        				"subDate" : submission.subDate,
        				"replyDate" : submission.replyDate,
        				"response" : submission.response,
        				"comment" : submission.comment
        			};
        		}
        	});
        }
        res.json(response);
    });
})
.put(function(req,res){
    var response = {};
    mongoOp.findOne({ "storyId" : req.params.storyId, "submissions.subId" : req.params.subId }, function(err,data) {
        if(err) {
            response = {"error" : true,"message" : "Error fetching data"};
            res.json(response);
        } else {

        	for(var key in data.submissions)
        	{
        		if(data.submissions[key].subId === req.params.subId) {
        			var index = key;
        		}
        	}
            if(req.body.market !== undefined) { data.submissions[index].market = req.body.market; }
            if(req.body.subDate !== undefined) { data.submissions[index].subDate = req.body.subDate; }
            if(req.body.replyDate !== undefined) { data.submissions[index].replyDate = req.body.replyDate; }
            if(req.body.response !== undefined) { data.submissions[index].response = req.body.response; }
            if(req.body.comment !== undefined) { data.submissions[index].comment = req.body.comment; }
            data.save(function(err){
                if(err) {
                    response = {"error" : true,"message" : "Error updating data"};
                } else {
                    response = {"error" : false,"message" : "Data is updated for " + req.params.storyId};
                }
                res.json(response);
            })
        }
    });
})
.delete(function(req,res){
    var response = {};
    mongoOp.findOne({ "storyId" : req.params.storyId, "submissions.subId" : req.params.subId }, function(err,data) {
        if(err) {
            response = {"error" : true,"message" : "Error fetching data"};
            res.json(response);
        } else {
        	for(var key in data.submissions)
        	{
        		if(data.submissions[key].subId === req.params.subId) {
        			var index = key;
        		}
        	}
        	data.submissions[index].remove();
        	data.save(function(err){
                if(err) {
                    response = {"error" : true,"message" : "Error updating data"};
                } else {
                    response = {"error" : false,"message" : "Data is updated for " + req.params.storyId};
                }
                res.json(response);
            });
        }
    });
});

// Readers
router.route("/stories/:storyId/readers")
.get(function(req,res){
	utilities.log("MESSAGE", "Client requested reader list");
	mongoOp.findOne({ "storyId" : req.params.storyId },function(err,data){
		if(err) {
			utilities.log("ERROR", "Failed to get reader list");
			response = {"error" : true,"message" : "Error fetching data"};
		} else {
			var response = {};
			response['storyId'] = data.storyId;
			response['title'] = data.title;
			response['readers'] = [];
			response['readerCount'] = data.readers.length;

			data.readers.forEach(function(reader) {
				response.readers.push({
					"readerId" : reader.readerId,
					"name" : reader.name,
					"readDate" : reader.readDate,
					"comment" : reader.comment
				});
			});
		}
		res.json(response);
	});
})
.post(function(req,res) {
	mongoOp.findOne({ "storyId" : req.params.storyId },function(err,data){
        if(err) {
            response = {"error" : true,"message" : "Error fetching data"};
            res.json(response);
        } else {
        	var readerId = uuid.v4();
            data.readers.push({
            	"readerId" : readerId,
            	"name" : req.body.name,
            	"readDate" : req.body.readDate,
				"comment" : req.body.comment
			});
            data.save(function(err){
                if(err) {
                    response = {"error" : true,"message" : "Error updating data"};
                } else {
                    response = {"error" : false,"message" : "Data is updated for " + req.params.storyId};
                }
                res.json(response);
            });
        }
    });
});

router.route("/stories/:storyId/readers/:readerId")
.get(function(req,res){
    var response = {};
    mongoOp.findOne({ "storyId" : req.params.storyId, "readers.readerId" : req.params.readerId }, function(err,data) {
        if(err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else {
        	data.readers.forEach(function(reader) {
        		if(reader.readerId === req.params.readerId) {
        			response = {
        				"storyId" : req.params.storyId,
        				"title" : data.title,
        				"readerId" : req.params.readerId,
        				"name" : reader.name,
        				"readDate" : reader.readDate,
        				"comment" : reader.comment
        			};
        		}
        	});
        }
        res.json(response);
    });
})
.put(function(req,res){
    var response = {};
    mongoOp.findOne({ "storyId" : req.params.storyId, "readers.readerId" : req.params.readerId }, function(err,data) {
        if(err) {
            response = {"error" : true,"message" : "Error fetching data"};
            res.json(response);
        } else {

        	for(var key in data.readers)
        	{
        		if(data.readers[key].readerId === req.params.readerId) {
        			var index = key;
        		}
        	}
            if(req.body.name !== undefined) { data.readers[index].name = req.body.name; }
            if(req.body.readDate !== undefined) { data.readers[index].readDate = req.body.readDate; }
            if(req.body.comment !== undefined) { data.readers[index].comment = req.body.comment; }
            data.save(function(err){
                if(err) {
                    response = {"error" : true,"message" : "Error updating data"};
                } else {
                    response = {"error" : false,"message" : "Data is updated for " + req.params.storyId};
                }
                res.json(response);
            })
        }
    });
})
.delete(function(req,res){
    var response = {};
    mongoOp.findOne({ "storyId" : req.params.storyId, "readers.readerId" : req.params.readerId }, function(err,data) {
        if(err) {
            response = {"error" : true,"message" : "Error fetching data"};
            res.json(response);
        } else {
        	for(var key in data.readers)
        	{
        		if(data.readers[key].readerId === req.params.readerId) {
        			var index = key;
        		}
        	}
        	data.readers[index].remove();
        	data.save(function(err){
                if(err) {
                    response = {"error" : true,"message" : "Error updating data"};
                } else {
                    response = {"error" : false,"message" : "Data is updated for " + req.params.storyId};
                }
                res.json(response);
            });
        }
    });
});

router.route("/backup.json")
.get(function(req,res){
    utilities.log("MESSAGE", "Client requested backup");
    var response = [];
    mongoOp.find({},function(err,data){
        if(err) {
            utilities.log("ERROR", "Failed to get stories list for backup");
            response = {"error" : true,"message" : "Error fetching data"};
            res.json(response);
        } else {
            utilities.log("MESSAGE", "Request successful.");
            var storyBackup = [];

            data.forEach(function(story){
                storyBackup.push(story);
            });

            res.set({'Content-Disposition':'attachment; filename="backup.json"'});
            res.send(storyBackup);
            res.end()
        }
    });
});

app.use('/',router);

app.listen(1337);
utilities.log("MESSAGE", "StoryTracker started on port 1337.");