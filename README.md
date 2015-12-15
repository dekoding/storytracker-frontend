# StoryTracker
StoryTracker is a project to bring a fully functional web application for tracking story data to writers. It's written using the following components:

* **MongoDB** - A popular document database format for the modern web.
* **Node.js** - A modern tool for running JavaScript without a browser.
* **Express** - A framework for serving web content, for Node.js.
* **Angular.js** - A JavaScript framework for MVC applications, developed by Google.
* **Bootstrap** - A CSS and JavaScript front-end to make things pretty, developed by Twitter.

### Disclaimer
This is an ALPHA application, very much pre-release, and there are probably (definitely) bugs. I take no responsibility for any harm this application does to the data you enter with it. If you are interested in helping develop it, feel free to fork it and submit your edits.

## Features
* View, add, edit, and delete story metadata including genre, wordcount, writing status, and comments.
* Log story readers and market submissions.
* All edits to story, submission, and reader records are committed automatically. No need to worry about whether you've hit a "Save" button recently.
* See at a glance which stories are currently at markets or have sold.
* See detailed submission and reader statistics for your stories, such as number of rejections.
* Download a backup of your information database at any time.
* Responsive UI suitable for desktops, tablets, and mobile devices (only when installed to a server).

## Installation

### Prerequisites
1. Install npm.
2. Install Node.js.
3. Install MongoDB.
4. Install git to clone this repository. (Alternately, download the repository manually, but git is recommended).

### Setup
1. In the storytracker directory, install the dependencies using `npm install`.
2. Run `node storytracker.js`.
3. (Local installation) In your browser, go to http://127.0.0.1:1337/#/stories
4. (Server installation) In your browser, go to http://servername:1337/#/stories

When you add your first story, StoryTracker will create a database called "storytracker" with a collection called "stories" automatically. The database name can be customized by editing the file `models/mongo.js` if desired. For now, the collection name is not as easy to modify, since it is derived from the application URL.

## Known bugs
* Node.js console logging is incomplete, and will remain so until I have the time to delve into `console.log()` options more deeply.
* Date-based searching for submissions and readers is a work-in-progress and doesn't behave as expected.
* ~~If no reply date is specified for a submission, the statistics for that submission show a wait time of 16654 days. This will be corrected shortly.~~ FIXED 12/12/2015

## Plans
In the future, I'd like to add:
* An installer (possibly as an NPM package)
* A report generator
* Backup options for individual records.
* And more...

## HELP!
I'm a one-man show, and not a graphic designer. I can program what needs programming, but if you want it to look pretty, that's something I'm going to need help with. If you're a CSS master or graphic design wiz, and want to help, feel free to submit upgrades.
