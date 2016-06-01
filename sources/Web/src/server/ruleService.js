var dbServices = require('./dbServices.js')

var app;
var dbConnection;

module.exports = {
	init : function(theApp){
		app = theApp;

		/**************************************/
		/*
			Add a rule to a device
			method: post
			path: /api/devices/:deviceId/rules
			params: deviceId
			returns: ruleId
		*/
		/**************************************/
		app.post('/api/devices/:deviceId/rules', function (req, res) {
			var message = null;
			var item = req.body;

			var callback = function(id){
				if(id > 0){
				  	message = {
						code: 200,
						deviceId: id
					};
				}else{
					message = {
						code: 500,
						errorMessage: "Internal server error"
					};
				}
				res.send(JSON.stringify(message));
			};
		  	dbServices.addRule(req.params.deviceId, item, callback);  	
		});

		/**************************************/
		/*
			Get rules by device
			method: post
			path: /api/devices/:deviceId/rules
			params: userId
			returns: rules list
		*/
		/**************************************/
		app.get('/api/devices/:deviceId/rules', function (req, res) {
			var message = null;
			var item = req.body;

			var callback = function(rules){
				if(rules.length > 0){
				  	message = {
						code: 200,
						data: rules
					};
			
				}else{
					message = {
						code: 500,
						errorMessage: "Internal server error"
					};
				}
				res.send(JSON.stringify(message));
			};
		  	dbServices.getAllRulesByDevice(req.params.deviceId, callback);  	
		});

		/**************************************/
		/*
			Updates a device
			method: get
			path: /api/devices/:deviceId/rules/:ruleId
			params: deviceId, ruleId
			returns: 200 if ok
		*/
		/**************************************/
		app.put('/api/devices/:deviceId/rules/:ruleId', function (req, res) {
			var message = null;
			var item = req.body;

			var callback = function(result){
				if(result != null){
				  	message = {
						code: 200,
						data: result
					};
				}else{
					message = {
						code: 500,
						errorMessage: "Internal server error"
					};
				}
				res.send(JSON.stringify(message));
			};
		  	dbServices.updateRule(req.params.deviceId, item, callback);  	
		});
	}
};