var dbServices = require('./dbServices.js')

var app;
var dbConnection;

var Device = function(id, deviceName, deviceCode){
	this.id = id;
	this.deviceName = deviceName;
	this.deviceCode = deviceCode;
}

module.exports = {
	init : function(theApp){
		app = theApp;

		app.post('/devices/:userId', function (req, res) {
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
						code: 400,
						errorMessage: "The device is already on the user's list"
					};
				}else{
					message = {
						code: 500,
						errorMessage: "Internal server error"
					};
				}
				res.send(JSON.stringify(message));
			};
		  	dbServices.addDeviceToUser(item.device_name, item.device_code, req.params.userId, callback);  	
		});
	}
};