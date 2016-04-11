// server.js

// set up ======================================================================
// get all the tools we need
var express = require('express');
var app = express();
var fs = require("fs"); 
var jsdom = require("node-jsdom");
var uuid = require('node-uuid');
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var mailer = require("nodemailer");

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var session = require('express-session');

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


/*
io.on("connection", function (socket) {
    var tweet = {user: "nodesource", text: "Testing Server To Client Communication!"};

	function addLeadingZero(num){
                   return (num <= 9)? ("0"+num) : num;
               }
			   

									
    // to make things interesting, have it send every second
    var interval = setInterval(function () {
        //socket.emit("tweet", {"firstName":"John", "lastName":"Doe"});
	                    var currDate = new Date();
                        var label = addLeadingZero(currDate.getHours()) + ":" + addLeadingZero(currDate.getMinutes()) + ":" + addLeadingZero(currDate.getSeconds());
                        // Get random number between 35.25 & 35.75 - rounded to 2 decimal places
                        var randomValue = Math.floor(Math.random() * 50) / 100 + 35.25;
                        // Build Data String in format &label=...&value=...
                        var strData = "&label=" + label + "&value=" + randomValue;

		socket.emit("tweet", strData);
    }, 1000);

    socket.on("disconnect", function () {
        clearInterval(interval);
    });
}); 
*/


//////////////////////////////////////////////////////////////////////////////////get the item being added.
app.post('/getNewObject', function(req, res) {


var curr_id = uuid.v1();
res.json(curr_id);

/*	
	var curr_id = uuid.v1();
	//console.log(curr_id);
	var el2 = req.body.currentHtml;
	var el1 = req.body.loggedinUser;
	var isAngular = req.body.isAngular;
	var dataSource = req.dataSource;
	console.log(isAngular);
	console.log(dataSource);
	console.log(el2);
	//console.log(el);
	//console.log(el1);
	//io.sockets.emit('added_Html',req.body);
	
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
	el.setAttribute("id",curr_id);
	
    //return el;
	//console.log(el.outerHTML);
//////////////////sample test	
	
	io.sockets.emit('added_Html',{'loggedinUser':el1,'currentHtml':el.outerHTML});
	
	res.json(curr_id);
	
	
	//.setAttribute("id",JSON.parse(aaa));
*/	
	
		
});

//////////////////////////////////////////////////////////////////////////////////get the item being added.





//////////////////////////////////////////////////////////////////////////////////move the item being added.
/*
app.post('/moveObject', function(req, res) {

//xhttp.send("loggedinUser=" + loggedinUser + "&currentId=" + this.id + "&positionX=" + ui.position.left+ "&positionY=" + ui.position.top);  
	
	io.sockets.emit('moved_Html',req.body);
	//console.log(req.body);	
	var curr_id = uuid.v1();
	res.json(curr_id);
});
*/
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
	//console.log(el);
	//console.log(el1);
	//io.sockets.emit('added_Html',req.body);
	
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
//			el.setAttribute("dataSource",JSON.stringify(dataSource));			
			//dataSource='{{myRealTimeData}}'
io.sockets.emit('added_Html',{'loggedinUser':el1,'currentHtml':el.outerHTML, 'isAngular': isAngular, 'dataSource': dataSource});
el.setAttribute("dataSource",JSON.stringify(dataSource));				
	}
	else{
io.sockets.emit('added_Html',{'loggedinUser':el1,'currentHtml':el.outerHTML, 'isAngular': isAngular, 'dataSource': null});		
//io.sockets.emit('added_Html',{'loggedinUser':el1,'currentHtml':el.outerHTML});		
	}

	//console.log(el.id);
    //return el;
	//console.log(el.outerHTML);
//////////////////sample test	
	
	
	
	//res.json(curr_id);
	
	
	//.setAttribute("id",JSON.parse(aaa));	
	
	
	
  });  
  


}); 







///////////////////////////////////////////////////////////////////////////////////////////
								//CORRECT
///////////////////////////////////////////////////////////////////////////////////////////
/*
var htmlSource = fs.readFileSync("./client/client.html", "utf8");

var jsdom_d = jsdom.jsdom;
var document = jsdom_d(htmlSource);


var test_li = '<li id="aaa" class="drag-elements-li obstacle" draggable="true">Element One</li>';

//console.log(test_li);

var myElement = document.getElementById("main_ui");

//var window = jsdom.jsdom().defaultView;
var window = document.defaultView;

jsdom.jQueryify(window, "http://code.jquery.com/jquery.js", function () {

  var $ = window.$;
  
  var $jQueryObject = $($.parseHTML(test_li));
  var curr_id = uuid.v1();
  $jQueryObject.attr("id",curr_id);
  //$("#main_ui").append($jQueryObject);
  $("#drop-target-one").append($jQueryObject);
  
  
fs.writeFile('./client/out.html', $('html')[0].outerHTML,
			 function (error){
	if (error) throw error;
	
});	
  
  
    //console.log($jQueryObject.attr('id'));
  //console.log($jQueryObject.attr('id'));
  //document.getElementById("main_ui").append(test_li);
  //$("#main_ui").append(test_li);
  //console.log($('html').html());
  //$(myElement).append(test_li);
  //console.log(myElement.childNodes[0].outerHTML);
  //console.log(myElement.childNodes[1].outerHTML);
  //console.log(myElement.childNodes[2].outerHTML);
  //console.log(myElement.childNodes[3].outerHTMLls);  
  //$("body").prepend("<h1>The title</h1>");
  //console.log("jq");
});


*/
///////////////////////////////////////////////////////////////////////////////////////////
								//CORRECT
///////////////////////////////////////////////////////////////////////////////////////////





//app.listen(port);
server.listen(port);
//var host_add = 'localhost';
//server.listen(port,host_add);

console.log('The magic happens on port ' + port);



//$(myElement).append(test_li);
//console.log(myElement.className);
//var curr_id = uuid.v1();

//myElement.appendChild();


/*
if (!document.head.querySelector("script[src$='2.0.3/jquery.min.js']")) {
	//console.log("hiii");
    var script = document.createElement("script");
    script.src = "//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js";
    document.head.appendChild(script);
}
*/

/*
fs.writeFile('./client/out.html', document.documentElement.outerHTML,
			 function (error){
	if (error) throw error;
	
	//console.log('Hellooooooooo');	
});		
*/


/*
jsdom.env(htmlSource,
  ["http://code.jquery.com/jquery.js"],
  function (errors, window) {
    //console.log("there have been", window.$("a").length, "nodejs releases!");
  //var $ = require('jquery')(window);
var $ = window.$; 
        $("div").each(function () {
            var content = $(this).text();
			//console.log(this);	
            //$(this).text(content + " modified!");
        });
  			//console.log('Hellooooooooo');
			
        fs.writeFile('out.html', window.document.documentElement.outerHTML,
                     function (error){
            if (error) throw error;
			
			console.log('Hellooooooooo');	
        });			
  
  
  }
);
*/

///////////////////////////////////////////////////////////////////////////////////////////



