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

Navigate to `localhost:3000` and experiment with the feature. For best experience, make sure you are launching a new web browser tab with a width of at least 1400px. This will insure the buttons are all one line.

Start button: Start will initiate the process and will the client will request new point every 2 seconds (ajax polling) from the server via GET method.

Pause button: Pause will pause at any state of the drone flight path. Whenever pause button is clicked, user can click on start again to resume the drone flight. Pause will not work unless drone is flying.

Restart button: Terminates all existing process and reinitialize the flight from the first provided coordinate (given by the server).

##State
There are only two states within this application, start and pause. Restart is basically a start but with the ability to clear the map and restart on the first coordinate.

The server and the client manages the state. Future applicational improvements could include using socket.io on the frontend. This will no longer need state management on the frontend. Implementing socket.io on the frontend will be helpful for larger applications.

##Test
Using HapiJS Lab for my tests.
NOTE: Running `npm test` will start running the test but please be aware that because coverage is not 100%, node will indicate that Test has failed. Please do not worry! Everything is alright! :)

To generate a new coverage.html, run `lab -r html -o coverage.html` or just open up the file to view what has been tested and what is coming.

##Feedback
Feedback are awesome. If you have any suggestions, improvements, issues, or questions, please either pull request or shoot me an email at thung at me dot com
