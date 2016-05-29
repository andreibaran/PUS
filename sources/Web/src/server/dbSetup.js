var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'admin',
  password : 'root',
  database : 'pus'
});

var setup = function(){
	connection.connect();

	connection.query('CREATE TABLE IF NOT EXISTS users('+
	                'id int,'+
	                'username VARCHAR(100),'+
	                'password VARCHAR(100),'+	//TODO : add preferences list
	                'PRIMARY KEY(id))', function(err, result){
	                    if(err) {
	                        console.log(err);
	                    }
	                    else{
	                        console.log("# table USERS created");
	                    }
	                });

	connection.query('CREATE TABLE IF NOT EXISTS devices ('+
	                'id int,'+
	                'device_code varchar(100),'+
	                'device_name varchar(100),'+
	                'PRIMARY KEY(id))', function(err, result){
	                    if(err) {
	                        console.log(err);
	                    }
	                    else{
	                        console.log("# table DEVICES created");
	                    }
	                });

	connection.query('CREATE TABLE IF NOT EXISTS users_devices('+
	                'id int,'+
	                'user_id int,'+
	                'device_id int,'+
	                'PRIMARY KEY(id),'+
					'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,'+
					'FOREIGN KEY(device_id) REFERENCES devices(id) ON DELETE CASCADE)', function(err, result){
	                    if(err) {
	                        console.log(err);
	                    }
	                    else{
	                        console.log("# table USERS_DEVICES created");
	                    }
	                });

	connection.query('CREATE TABLE IF NOT EXISTS users_devices('+
	                'id int,'+
	                'user_id int,'+
	                'device_id int,'+
	                'PRIMARY KEY(id),'+
					'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,'+
					'FOREIGN KEY(device_id) REFERENCES devices(id) ON DELETE CASCADE)', function(err, result){
	                    if(err) {
	                        console.log(err);
	                    }
	                    else{
	                        console.log("# table USERS_DEVICES created");
	                    }
	                });

	connection.query('CREATE TABLE IF NOT EXISTS account_preferences ('+
	                'id int,'+
	                'name VARCHAR(100),'+
	                'preference_value varchar(100),'+
	                'user_id int,'+
	                'PRIMARY KEY(id),'+
					'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE)', function(err, result){
	                    if(err) {
	                        console.log(err);
	                    }
	                    else{
	                        console.log("# table USERS_DEVICES created");
	                    }
	                });
	connection.end();
};

exports.setup = setup;