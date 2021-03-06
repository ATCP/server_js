'use strict'

var express = require("express");
var app = express();
var execPHP = require('./execphp.js')();

execPHP.phpFolder = '.';

var webServerPort = 8080;

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

    //res.header("X-Powered-By",' 3.2.1')
    //res.header("Content-Type", "application/javascript;charset=utf-8");
    next();
});


//app.use(express.static(__dirname + '/public'));

app.use('*.php',function(request,response,next) {
	console.log(request.originalUrl);

	execPHP.parseFile(request.originalUrl,function(phpResult) {
		response.write(phpResult);
		response.end();
	});
});

/* serves main page */
app.get("/", function(req, res) {
    res.sendfile('index.html')
});

app.post("/user/add", function(req, res) {
    /* some server side logic */
    res.send("OK");
});

/* serves all the static files */
app.get(/^(.+)$/, function(req, res){
    console.log('static file request : ' + req.params);
    res.sendFile( __dirname + req.params[0]);
});

/*
var port = process.env.PORT || webServerPort;
app.listen(port, function() {
    console.log("Listening on " + port);
});
*/

exports.app = app;

