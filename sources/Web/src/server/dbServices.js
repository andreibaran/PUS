var mysql = require('mysql');
var connection;

var defaultPreferences = [
	{
		preferenceKey : 'theme',
		preferenceValue : 'default'
	},
	{
		preferenceKey : 'font',
		preferenceValue : '10'
	},
	{
		preferenceKey : 'display',
		preferenceValue : 'grid'
	}
];

module.exports = {
	init : function(theConnection){
		connection = theConnection;
	},

	createUser : function(username, password, name, callback){
		console.log("> create user");
		connection.query('SELECT * from users where username = "'+username+'"', function(err, result, fields) {
			if (!err){
				if(result.length == 0){
					connection.query('insert into users (username, password, name) values ("'+username+'","'+password+'","'+name+'")',function(err, rows) {
						if (!err){
							console.log("< create user");
							/* insert default preferences */
							var hasErrors = false;
							defaultPreferences.forEach(function(preference){
								var key = preference.preferenceKey;
								var value = preference.preferenceValue;
							console.log("k"+key);
								connection.query('insert into account_preferences (name, preference_value, user_id) '
									+'values ("'+key+'","'+value+'","'+rows.insertId+'")',function(err, rws) {
									if (err){
									    console.log('# Error at insert preferences: '+err);
									    hasErrors = true;
									}
								});
							});
							if(!hasErrors){
								callback(rows.insertId);
							}
						}else{
						    console.log('# Error at insert users: '+err);
						    callback(null);
						}
					});
				}else{
					console.log("< create user");
					callback(0);
				}
			}else{
				console.log('# Error at select users: '+err);
				callback(null);
			} 
		});
	},

	addDeviceToUser : function(device, userId, callback){
		console.log("> add device");
		connection.query('SELECT * '
			+'from devices inner join users_devices on devices.id = users_devices.device_id '
			+'where devices.device_uuid = "'+device.device_uuid
				+'" and users_devices.user_id='+userId+'', function(err, result, fields) {
			if (!err){
				if(result.length == 0){
					connection.query('insert into devices (device_uuid, device_name, device_registration_id) values ("'+device.device_uuid+'","'+device.device_name+'","'+device.device_registration_id+'")',function(err, rows) {
						if (!err){
							console.log("< add device");
							connection.query('insert into users_devices (user_id, device_id) values ("'+userId+'","'+rows.insertId+'")',function(err, row) {
								if (err){
								    console.log('# Error at add device: '+err);
								    callback(null);
								}
							});
							callback(rows.insertId);
						}else{
						    console.log('# Error at add device: '+err);
						    callback(null);
						}
					});
				}else{
					console.log("< update device");
					connection.query('update devices set device_registration_id = "'+device.device_registration_id+'" where device_uuid = "' + device.device_uuid + '"',function(err, rows) {
						if (!err){
							console.log("< update device");
							callback(0);
						}else{
							console.log('# Error at update device: '+err);
							callback(null);
						} 
					});
				}
			}else{
				console.log('# Error at add device: '+err);
				callback(null);
			} 
		});
	},

	login : function (username, password, callback){
		console.log("> login user");
		var loginObject = {};
		loginObject.user = {};
		loginObject.preferences = [];
		loginObject.devices = [];
		connection.query('SELECT username, id, name from users where username = "'+username+'" and password ="'+password+'"', function(err, result, fields) {
			if (!err){
				if(result.length == 1){
					loginObject.user.username = result[0].username;
					loginObject.user.id = result[0].id;
					loginObject.user.name = result[0].name;

					connection.query('select name, preference_value '
						+'from account_preferences '
						+'where user_id = '+loginObject.user.id+'',function(err, rows, flds) {
						if (!err){
							if(rows.length > 0){
								for(var i=0 ; i<rows.length ; i++){
									loginObject.preferences.push(rows[i]);
								}
							}
							connection.query('select d.* '
								+'from devices d inner join users_devices u on d.id = u.device_id '
								+'where u.user_id = '+loginObject.user.id+'',function(err, rowss, flds) {
								if (!err){
									if(rowss.length > 0){
										for(var i=0 ; i<rowss.length ; i++){
											loginObject.devices.push(rowss[i]);
										}
									}
									console.log("< login user");
									callback(loginObject);
								}else{
								    console.log('# Error select devices: '+err);
								    callback(null);
								}
							});
						}else{
						    console.log('# Error at select preferences: '+err);
						    callback(null);
						}
					});
				}else{
					console.log("< login user");
					callback(0);
				}
			}else{
				console.log('# Error at login users: '+err);
				callback(null);
			} 
		});
	},

	updatePreference : function(userId, preferenceKey, preferenceValue, callback){
		console.log("> update preference");
		connection.query('UPDATE account_preferences SET preference_value = "'+preferenceValue+'" '
				+'where name = "'+preferenceKey+'" and user_id = '+userId+'', function(err, result, fields) {
			if (!err){
				console.log("< update preference");
				callback(true);
			}else{
				console.log('# Error at update preference: '+err);
				callback(null);
			} 
		});
	},

	deleteDeviceFromUser : function(deviceId, userId, callback){
		console.log("> remove device");
		connection.query('DELETE from users_devices where device_id = '+deviceId+' and user_id = '+userId+""
				, function(err, result, fields) {
			if (!err){
				console.log("< remove device");
				callback(true);
			}else{
				console.log('# Error at update preference: '+err);
				callback(null);
			} 
		});
	}
};

