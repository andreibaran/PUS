var dbServices = require('./dbServices.js')

var users = [];
var app;
var dbConnection;

var User = function(id, username, password, name){
	this.username = username;
	this.password = passowrd;
	this.id = id;
	this.name = name;
}

var Device = function(id, deviceName, deviceCode){
	this.id = id;
	this.deviceName = deviceName;
	this.deviceCode = deviceCode;
}

var init = function(theApp){
	app = theApp;

	app.post('/users', function (req, res) {
		var message = null;
		var item = req.body;

		var callback = function(correct){
			if(correct == true){
		  	message = {
				code: 200
			};
			}else if (correct == false){
				message = {
					code: 400,
					errorMessage: "The user already exists"
				};
			}else{
				message = {
					code: 500,
					errorMessage: "Internal server error"
				};
			}
			res.send(JSON.stringify(message));
		};
	  	dbServices.createUser(item.username, item.password, item.name, callback);  	
	});

	app.post('/login', function (req, res) {
		var item = req.body;
		var message = null;
		var loginObject = null;
	  	loginObject = dbServices.login(item.username, item.password);
	  	if(loginObject != null){
		  	message = {
				code: 200,
				data: loginObject
			};
		}else{
			message = {
				code: 400,
				errorMessage: "Incorrect credentials"
			};
		}
		res.send(JSON.stringify(message));
	});
};

exports.init = init;
