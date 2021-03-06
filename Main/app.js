﻿// server.js

// set up ======================================================================
// get all the tools we need
var express = require('express');
var app = express();
var jsdom = require("node-jsdom");
var uuid = require('node-uuid');
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var restClient = require('node-rest-client').Client;

var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var client = new restClient();

var configDB = require('./config/database.js');
app.use('/js', express.static(__dirname + '/client/js'));
app.use('/styles', express.static(__dirname + '/public/stylesheets'));


//:::::::::::::::::::::::::::::::::::Balaji:::::::::::::::::::::::::::::::::::::

// Variables ===================================================================



//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// configuration ===============================================================

var options = {
    db: { native_parser: true },
    server: { poolSize: 5 },
    replset: { rs_name: 'myReplicaSetName' },
    user: 'admin',
    pass: 'admin'
};

mongoose.connect(configDB.url, options);
require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================

//:::::::::::::::::::::::::::::::::::Balaji:::::::::::::::::::::::::::::::::::::

// REST Methods=================================================================

/**
* Get the list of data and its types via REST service from MES
* Sort them with respect to data type
* Hint: Every sorting is done here inorder to let the client be light weight and faster
*/
function initialConfig(){
	client.get("http://localhost:3080/mes/datapoints", function (data, response) {
		
		// Variables ===================================================================		
		var dataPoints = [];
		var booleanDataPoints = [];
		var doubleDataPoints = [];
		var integerDataPoints = [];
		var stringDataPoints = [];
		var longDataPoints = [];
		
		// Assign it directly for all data types
		dataPoints = data;
		
		//Going through each array of data
		for(incDP = 0; lenDP = data.length, incDP < lenDP; incDP++){
			//Array for getting the keys under 'data' in JSON message
			var mesData = [];
			//Get the total number of data points present in a phase
			mesData = Object.keys(data[incDP].data);
			for(incDataKey = 0; lenDataKey = mesData.length, incDataKey < lenDataKey; incDataKey++){
				//Based upon the type of the data point assign it to the socket variables
				switch(data[incDP].data[mesData[incDataKey]]){
					case 'boolean':
						booleanDataPoints.push(data[incDP].id + '_' + mesData[incDataKey]);
						break;
					case 'integer':
						integerDataPoints.push(data[incDP].id + '_' + mesData[incDataKey]);
						break;
					case 'string':
						stringDataPoints.push(data[incDP].id + '_' + mesData[incDataKey]);
						break;
					case 'double':
						doubleDataPoints.push(data[incDP].id + '_' + mesData[incDataKey]);
						break;
					case 'long':
						longDataPoints.push(data[incDP].id + '_' + mesData[incDataKey]);
						break;
					default:
						console.log(data[incDP].id + '_' + mesData[incDataKey]);
						break;
				}	
			}
		}				
		
		// Emit the type with data points to the Client (HTML)
		io.sockets.emit('boolean_DataPoint',booleanDataPoints);
		io.sockets.emit('integer_DataPoint',integerDataPoints);
		io.sockets.emit('double_DataPoint',doubleDataPoints);
		io.sockets.emit('long_DataPoint',longDataPoints);
		io.sockets.emit('string_DataPoint',stringDataPoints);
		io.sockets.emit('all_DataPoint',dataPoints);
	});
}

//Calling the function to get the data point and associate them
initialConfig();

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//-----------------------------------------------------------------------------//


//////////////////////////////////////////////////////////////////////////////////get the item being added.
app.post('/getNewObject', function(req, res) {
	var curr_id = uuid.v1();
	res.json(curr_id);	
});

//////////////////////////////////////////////////////////////////////////////////get the item being added.

//////////////////////////////////////////////////////////////////////////////////move the item being added.

//Using Sockets the Copy the above code.

io.on("connection", function (socket) {
	
	socket.on('propChanged', function(data){
		io.sockets.emit('prop_Changed',data);
	});
	
	socket.on('initialConfig', function(data){
		//Calling the function to get the data point and associate them
		initialConfig();
	});
	
	//masking the panel visible on double clicks
	socket.on('panelVisibility', function(data){
		io.sockets.emit('panel_Visibility',data);
	});

	socket.on('moveObject', function(data){
		io.sockets.emit('moved_Html',data);
		//console.log(data);			
	  });
	  
	socket.on('newObject', function(data){
	
		var el2 = data.currentHtml;
		var el1 = data.loggedinUser;
		var isAngular = data.isAngular;
		var dataSource = data.dataSource;
		var angularId;
		
		if(isAngular){
			angularId = JSON.parse(data.id);
		}
		
		io.sockets.emit("added_Object",data);
	
		//////////////////sample test
		var document = jsdom.jsdom();
		var frame = document.createElement('iframe');
		frame.style.display = 'none';
		document.body.appendChild(frame);             
		frame.contentDocument.open();
		frame.contentDocument.write(el2);
		frame.contentDocument.close();
		var el = frame.contentDocument.body.firstChild;
		document.body.removeChild(frame);
		
		if(isAngular){
			el.removeAttribute("id");
			el.setAttribute("id",angularId);
			io.sockets.emit('added_Html',{'loggedinUser':el1,'currentHtml':el.outerHTML, 'isAngular': isAngular, 'dataSource': dataSource});
			el.setAttribute("dataSource",JSON.stringify(dataSource));				
		}else{
			io.sockets.emit('added_Html',{'loggedinUser':el1,'currentHtml':el.outerHTML, 'isAngular': isAngular, 'dataSource': null});		
		}
		
	}); 
}); 

server.listen(port);

console.log('The magic happens on port ' + port);

///////////////////////////////////////////////////////////////////////////////////////////



