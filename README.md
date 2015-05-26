mapbox-drones
=====
By: Tsung Hung

##Description
Mapbox Drones is a HapiJS powered application that takes in drone waypoint coordinates and keeps it into memory as the application runs. The application allows the client to start, pause, or restart the drone pre-planned route.

##Getting Started
To get started, please make sure you have node installed or iojs. On my end, I use iojs. If you want to use iojs while keeping your current node version, please check out [nvm](https://github.com/creationix/nvm).

Please insure you have nodemon installed on your computer. Nodemon is recommended to be installed globally. Here is the command if you do not have nodemon: `npm install -g nodemon`

Run these command:
```
git clone https://github.com/masterfung/mapbox
cd mapbox
npm install
nodemon server.js
```

Navigate to `localhost:3000` and experiment with the feature.

##Test
Using HapiJS Lab for my tests.
NOTE: Running `npm test` will start running the test but please be aware that because coverage is not 100%, node will indicate that Test has failed. Please do not worry! Everything is alright! :)

To generate a new coverage.html, run `lab -r html -o coverage.html` or just open up the file to view what has been tested and what is coming.

##Feedback
Feedback are awesome. If you have any suggestions, improvements, issues, or questions, please either pull request or shoot me an email at thung at me dot com
