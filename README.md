# StoryTracker

This is NOT READY and WILL NOT DO ANYTHING! Don't download this. Seriously. It's not even at the "alpha" stage, it's at the "I just came up with the idea and have done a tiny bit of coding on it" stage. It does literally nothing except pull some junk data from some JSON files. You can't use it for any purpose. It has no intended purpose right now.

IN THE FUTURE... this will be a downloadable package that allows authors to track their stories and story submissions, and run convenient reports. But it's not that right now. Not yet.

**UPDATE 11/23/2015**
This project is starting to take shape. I've switched to using Bootstrap for a lot of the UI components, while Angular handles the routing logic.

It's still not very usable, but if you'd like to see what's coming, do the following:

1. Install MongoDB and create a database called "storytracker" with a collection called "stories"
2. Configure access to MongoDB in the node mongo-db configuration file.
3. Run `node storytracker.js`
4. In your browser, go to 127.0.0.1:1337/#/stories (just ignore the boilerplate Bootstrap navbar at the top

Right now, adding, editing, and deleting stories works. Adding, editing, and deleting submissions and readers does not work. It will all hopefully work very soon.

Note that editing of stories is automatic. There's no save button because all typing is committed to the database automatically.
