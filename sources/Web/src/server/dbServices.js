var mysql      = require('mysql');
var connection;

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
							callback(true);
						}else{
						    console.log('# Error at insert users: '+err);
						    callback(null);
						}
					});
				}else{
					console.log("< create user");
					callback(false);
				}
			}else{
				console.log('# Error at select users: '+err);
				callback(null);
			} 
		});
		
	},

	login : function (username, password){
		connection.query('SELECT * from users', function(err, rows, fields) {
		  if (!err)
		    console.log('# Result: ', rows);
		  else
		    console.log('# Error at insert users: '+err);
		});
	}

};

