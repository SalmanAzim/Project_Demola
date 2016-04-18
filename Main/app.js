// server.js

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
// configuration ===============================================================
//mongoose.connect(configDB.url); // connect to our database
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

//-----------------------------------Balaji-----------------------------------//
// REST Methods=================================================================

client.get("http://localhost:3080/mes/datapoints", function (data, response) {
	// parsed response body as js object 
	console.log(data);
});

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


socket.on('moveObject', function(data){

	io.sockets.emit('moved_Html',data);
	console.log(data);	
	
  });
  
  
socket.on('newObject', function(data){
	

	//var curr_id = uuid.v1();
	//console.log(curr_id);
	var el2 = data.currentHtml;
	var el1 = data.loggedinUser;
	var isAngular = data.isAngular;
	var dataSource = data.dataSource;
	var angularId;
	if(isAngular){
		angularId = JSON.parse(data.id);
	}
	
	console.log(isAngular);
	console.log(dataSource);
	console.log(el2);
	
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
	}
	else{
io.sockets.emit('added_Html',{'loggedinUser':el1,'currentHtml':el.outerHTML, 'isAngular': isAngular, 'dataSource': null});		
	}
	
	
	
  });  
  


}); 


//app.listen(port);
server.listen(port);
//var host_add = 'localhost';
//server.listen(port,host_add);

console.log('The magic happens on port ' + port);

///////////////////////////////////////////////////////////////////////////////////////////



