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

module.exports = {
	init : function(theApp){
		app = theApp;

		/**************************************/
		/*
			Create new user
			method: post
			path: /api/users
			params: username, password
			returns: user id
		*/
		/**************************************/
		app.post('/api/users', function (req, res) {
			var message = null;
			var item = req.body;

			var callback = function(id){
				if(id > 0){
				  	message = {
						code: 200,
						userId: id
					};
				}else if (id == 0){
					message = {
						code: 409,
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

		/**************************************/
		/*
			Checks credentials and returns account details
			method: post
			path: /api/login
			params: username, password
			returns: loginObject: 
				user: id, username, name
				preferences [list]: name, preference_value
				devices [list]:  id, device_name, device_code
		*/
		/**************************************/
		app.post('/api/login', function (req, res) {
			var item = req.body;
			var message = null;
			var loginObject = null;
		  	var callback = function (loginObject){
			  	if(loginObject == 0){
				  	message = {
						code: 400,
						errorMessage: "Invalid credentials"
					};
				}else if (loginObject == null){
					message = {
						code: 500,
						errorMessage: "Internal server error"
					};
				}else{
					message = {
						code: 200,
						data: loginObject
					};
				}
				res.send(JSON.stringify(message));
			};
			dbServices.login(item.username, item.password, callback);
		});

		/**************************************/
		/*
			Change a preference from the ones predefined
			method: put
			path: /api/preferences
			params: userId, preferenceKey, preferenceValue
			returns: 200 if ok
		*/
		/**************************************/
		app.put('/api/preferences', function (req, res) {
			var item = req.body;
			var message = null;
			var result = null;
		  	var callback = function (result){
			  	if(result == true){
				  	message = {
						code: 200
					};
				}else{
					message = {
						code: 500,
						errorMessage: "Internal server error"
					};
				}
				res.send(JSON.stringify(message));
			};
			dbServices.changePreference(item.userId, item.preferenceKey, item.preferenceValue, callback);
		});
	}
};