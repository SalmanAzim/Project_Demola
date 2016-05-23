// server.js

// set up ======================================================================
// get all the tools we need
var express = require('express');
var app = express();
var jsdom = require("node-jsdom");
var uuid = require('node-uuid');
var http = require('http');
var fs = require('fs');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var restClient = require('node-rest-client').Client;
var favicon = require('serve-favicon');

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var client = new restClient();

var configDB = require('./config/database.js');
app.use(favicon(__dirname + '/client/images/favicon.ico'));
app.use('/js', express.static(__dirname + '/client/js'));
app.use('/css', express.static(__dirname + '/client/css'));
app.use('/images', express.static(__dirname + '/client/images'));
app.use('/fonts', express.static(__dirname + '/client/fonts'));
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


var dataPoints = [];

var dpParents = [];

/**
* Get the list of data and its types via REST service from MES
* Sort them with respect to data type
* Hint: Every sorting is done here inorder to let the client be light weight and faster
*/
function initialConfig() {

	//client.get("http://localhost:3080/mes/datapoints", function (data, response) {

	// Variables ===================================================================
	var booleanDataPoints = ['phase1_status', 'phase2_status'];
	var doubleDataPoints = ['phase1_completionPercent', 'phase2_completionPercent'];
	var integerDataPoints = ['phase1_productNos', 'phase2_productNos'];
	var stringDataPoints = ['phase1_location', 'phase2_location'];
	var longDataPoints = ['phase1_time', 'phase2_time'];
	var arrayMapStatus = ['phase2_indProdStat','overall_demandVsProd','overall_stockValue'];

	// Assign it directly for all data types
	dataPoints = [
		{
			data: {
				productAndStatus: "array(HashMap<string,object>)",
				completionPercent: "double",
				location: "string",
				time: "long",
				productList: "array(string)",
				status: "boolean",
				productNos: "integer"
			},
			id: "phase1",
			url: "http://localhost:3080/mes/datapoints?phase=1"
		},
		{
			data: {
				indProdStat: "hashmap(string, object)",
				completionPercent: "double",
				location: "string",
				time: "long",
				productList: "array(string)",
				productNos: "integer"
			},
			id: "phase2",
			url: "http://localhost:3080/mes/datapoints?phase=2"
		},
		{
			data: {
				demandVsProd: "hashmap(string, object)",
				stockValue: "hashmap(string, object)",
			},
			id: "overall",
			url: "http://localhost:3080/mes/datapoints?phase=2"
		}
	];

	//Going through each array of data
	/*for (incDP = 0; lenDP = data.length, incDP < lenDP; incDP++) {
		dpParents.push(data[incDP].id);
		//Array for getting the keys under 'data' in JSON message
		var mesData = [];
		//Get the total number of data points present in a phase
		mesData = Object.keys(data[incDP].data);
		for (incDataKey = 0; lenDataKey = mesData.length, incDataKey < lenDataKey; incDataKey++) {
			//Based upon the type of the data point assign it to the socket variables
			switch (data[incDP].data[mesData[incDataKey]]) {
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
				case 'array(hashmap<string,object>)':
					arrayMapStatus.push(data[incDP].id+ '_'+ mesData[incDataKey]);
					break;
				default:
					console.log(data[incDP].id + '_' + mesData[incDataKey]);
					break;
			}
		}
	}*/

	// Emit the type with data points to the Client (HTML)
	io.sockets.emit('boolean_DataPoint', booleanDataPoints);
	io.sockets.emit('integer_DataPoint', integerDataPoints);
	io.sockets.emit('double_DataPoint', doubleDataPoints);
	io.sockets.emit('long_DataPoint', longDataPoints);
	io.sockets.emit('string_DataPoint', stringDataPoints);
	io.sockets.emit('all_DataPoint', dataPoints);

	//call the function to register for all the events
	//eventRegister();
	//});
}

//Calling the function to get the data point and associate them
initialConfig();

/*function eventRegister() {
	//Register to all the events from the server
	for (incDP = 0; lenDP = dataPoints.length, incDP < lenDP; incDP++) {
		var args = {
			data: { "id": "client", "destUrl": "http://localhost:" + port + "/" + dataPoints[incDP].id + "/notifs" },
			headers: { "Content-Type": "application/json" }
		};
		//Array for getting the keys under 'data' in JSON message
		client.post(dataPoints[incDP].url, args, function (data, response) {
		});
	}
}*/


app.post('/:parent/notifs', function (req, res) {
	console.log(req.params.parent);
	io.sockets.emit(req.params.parent, req.body);
    res.send({});
});
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//-----------------------------------------------------------------------------//




//////////////////////////////////////////////////////////////////////////////////get the item being added.
app.post('/getNewObject', function (req, res) {
	var curr_id = uuid.v1();
	res.json(curr_id);
});

//////////////////////////////////////////////////////////////////////////////////get the item being added.

//////////////////////////////////////////////////////////////////////////////////move the item being added.

//Using Sockets the Copy the above code.

io.on("connection", function (socket) {

	socket.on('propChanged', function (data) {
		io.sockets.emit('prop_Changed', data);
	});

	socket.on('initialConfig', function (data) {
		//Calling the function to get the data point and associate them
		initialConfig();
	});

	//masking the panel visible on double clicks
	socket.on('panelVisibilityOnClick', function (data) {
		io.sockets.emit('panel_Visibility_OnClick', data);
	});

	//masking the panel visible on double clicks
	socket.on('panelVisibility', function (data) {
		io.sockets.emit('panel_Visibility', data);
	});

	socket.on('moveObject', function (data) {
		io.sockets.emit('moved_Html', data);
		io.sockets.emit('moved_Object', data);
	});

	socket.on('newObject', function (data) {

		var el2 = data.currentHtml;
		var el1 = data.loggedinUser;
		var isAngular = data.isAngular;
		var dataSource = data.dataSource;
		var angularId;

		if (isAngular) {
			angularId = JSON.parse(data.id);
		}

		io.sockets.emit("added_Object", data);

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

		if (isAngular) {
			el.removeAttribute("id");
			el.setAttribute("id", angularId);
			io.sockets.emit('added_Html', { 'loggedinUser': el1, 'currentHtml': el.outerHTML, 'isAngular': isAngular, 'dataSource': dataSource });
			el.setAttribute("dataSource", JSON.stringify(dataSource));
		} else {
			io.sockets.emit('added_Html', { 'loggedinUser': el1, 'currentHtml': el.outerHTML, 'isAngular': isAngular, 'dataSource': null });
		}

	});

	socket.on('createScreen', function (data) {
		//Initially Get the elements
        var elementsReceived = data.objects;
        // then get the name and background image url
        var pageName = data.name + ".ejs";
        var background = data.backGroundUrl;

        var htmlSource = fs.readFileSync("./views/basePage.ejs", "utf8");

        var jsdom_d = jsdom.jsdom;
        var document = jsdom_d(htmlSource);

        var window = document.defaultView;

        jsdom.jQueryify(window, "http://code.jquery.com/jquery.js", function () {
            var $ = window.$;
			//Set the attrbutes for the background
            $('body').css('background', 'url(../images/background-image3.jpg) no-repeat center center fixed');
			console.log(background);
            $('body').css('background', 'url(' + background + ') no-repeat center center fixed');
            $('body').css('position', 'absolute');
            $('body').css('top', '0');
            $('body').css('left', '0');
            $('body').css('height', '100%');
            $('body').css('width', '100%');
            $('body').css('-webkit-background-size', 'cover');
            $('body').css('-moz-background-size', 'cover');
            $('body').css('-o-background-size', 'cover');
            $('body').css('background-size', 'cover');
            $('body').css('top', '0');
            for (i = 0; len = elementsReceived.length, i < len; i++) {
                var $jQueryObject = $($.parseHTML(elementsReceived[i].finalHtml));
                $('body').append(elementsReceived[i].finalHtml);
            }
            //save the file
            fs.writeFile('./views/' + pageName, $('html')[0].outerHTML,
                function (error) {
                    if (error) throw error;
                });			
        });
		io.sockets.emit('creation_Success', { 'pageId': pageName.replace('.ejs','')});
	});
});

app.get('/:file', function (req, res) {
	res.render(req.params.file);
});

server.listen(server_port);

console.log('The magic happens on port ' + server_port);

///////////////////////////////////////////////////////////////////////////////////////////



