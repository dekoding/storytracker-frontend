StoryTracker.filter('StoryFilter', function () {
    var results = function(input, search) {
        var stories = [];
        angular.forEach(input, function(story) {
            var count = 0;
            if(search.genre === story.genre || search.genre === '' || search.genre === null || search.genre === undefined) {
                count += 1;
            }
            if(search.status === story.status || search.status === '' || search.status === null || search.status === undefined) {
                count += 1;
            }
            if(search.words !== null && search.words !== undefined) {// Word filter has been set.
                switch(search.words) {
                    case "Flash": if(story.words < 1000) count += 1; break;
                    case "Short": if(story.words >= 1000 && story.words <= 7499) count +=1; break;
                    case "Novelette": if(story.words >= 7500 && story.words <= 17499) count +=1; break;
                    case "Novella": if(story.words >= 17500 && story.words <= 39999) count +=1; break;
                    case "Novel": if(story.words >= 40000) count +=1; break;
                    default: break; // This should never happen.
                }
            } else { // Don't filter at all.
                count += 1;
            }
            if(search.title !== undefined && search.title !== null && search.title !== '') {
                search.title = search.title.toLowerCase();
                if(story.title.toLowerCase().indexOf(search.title) >= 0) {
                    count += 1;
                }
            } else {
                count += 1;
            }
            if(search.comments !== undefined && search.comments !== null && search.comments !== '') {
                console.log("Search comments = " + search.comments);
                search.comments = search.comments.toLowerCase();
                if(story.comments !== null) {
                    if(story.comments.toLowerCase().indexOf(search.comments) >= 0) {
                        count += 1;
                    }
                }
            } else {
                count += 1;
            }
            if(search.storyId !== story.storyId) {
                // This filter is for deleted items.
                count += 1;
            }

            if(count === 6) {
                stories.push(story);
            }
        });
        return stories;
    };
    return results;
});