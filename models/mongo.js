var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/storytracker');

var mongoSchema = mongoose.Schema;

var submissionSchema = {
	"subId" : String,
	"market" : String,
	"subDate" : Date,
	"replyDate" : Date,
	"response" : String,
	"comment" : String
}

var readerSchema = {
	"readerId" : String,
	"name" : String,
	"readDate" : Date,
	"comment" : String
}

var storySchema  = {
	"storyId" : String,
    "title" : String,
    "words" : String,
    "genre" : String,
    "status" : String,
    "comments" : String,
    "submissions" : [submissionSchema],
    "readers" : [readerSchema]
};
// create model if not exists.
module.exports = mongoose.model('story',storySchema);