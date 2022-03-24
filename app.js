var express = require('express');
var surveyController = require('./controllers/surveyController');

// Initilise the express framework here
var app = express()

// Set up the template
app.set('view engine', 'ejs')

// Static files
app.use(express.static('./public'));

// Fire off the Controller
surveyController(app)

// Listen for the port
app.listen(3000)
console.log("Listening at port 3000")