# StoryTracker

StoryTracker is a project to bring a fully functional web application for tracking story data to writers. It's written using the following components:

* **MongoDB** - A popular document database format for the modern web.
* **Node.js** - A modern tool for running JavaScript on a console, including the capacity to write web servers.
* **CustomServer** - A web server I wrote in Node.js, available in pure form here: https://github.com/GoodDamon/customserver
* **Angular.js** - A JavaScript framework for MVC applications, developed by Google.
* **Bootstrap** - A CSS and JavaScript front-end to make things pretty, developed by Twitter.

This is NOT READY FOR USE. Its features are extremely lacking right now. If you are interested in helping develop it, feel free to fork it and submit your edits.

**UPDATE 11/23/2015**
This project is starting to take shape. I've switched to using Bootstrap for a lot of the UI components, while Angular handles the routing logic.

It's still not very usable, but if you'd like to see what's coming, do the following:

1. Install MongoDB and create a database called "storytracker" with a collection called "stories"
2. Configure access to MongoDB in the node mongo-db configuration file.
3. Run `node storytracker.js`
4. In your browser, go to http://127.0.0.1:1337/#/stories (just ignore the boilerplate Bootstrap navbar at the top

Right now, adding, editing, and deleting stories works, and adding submissions works - albeit it doesn't refresh until you manually reload the page. Editing and deleting submissions and readers does not work. It will all hopefully work very soon. Nothing is very pretty yet, either. Don't worry, it'll get there.

Note that editing of stories is automatic. There's no save button because all typing is committed to the database automatically.
