var dbServices = require('./dbServices.js')

var app;
var dbConnection;

var Device = function(id, deviceName, deviceRegistrationID, deviceUUID){
	this.id = id;
	this.deviceName = deviceName;
	this.deviceRegistrationID = deviceRegistrationID;
	this.deviceUUID = deviceUUID;
}

module.exports = {
	init : function(theApp){
		app = theApp;

		/**************************************/
		/*
			Add a device to an user
			method: post
			path: /api/users/:userId/devices
			params: userId
			returns: deviceId
		*/
		/**************************************/
		app.post('/api/users/:userId/devices', function (req, res) {
			var message = null;
			var item = req.body;

			var callback = function(id){
				if(id > 0){
			  	message = {
					code: 200,
					deviceId: id
				};
				}else if (id == 0){
					message = {
						code: 200,
						errorMessage: "The device is already on the user's list. It has been updated"
					};
				}else{
					message = {
						code: 500,
						errorMessage: "Internal server error"
					};
				}
				res.send(JSON.stringify(message));
			};
		  	dbServices.addDeviceToUser(item, req.params.userId, callback);  	
		});

		/**************************************/
		/*
			Removes a device from the user's list
			method: delete
			path: /api/users/:userId/devices/:deviceId
			params: deviceId, userId
			returns: 200 if ok
		*/
		/**************************************/
		app.delete('/api/users/:userId/devices/:deviceId', function (req, res) {
			var message = null;
			var item = req.body;

			var callback = function(result){
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
		  	dbServices.deleteDeviceFromUser(req.params.deviceId, req.params.userId, callback);  	
		});
	}
};