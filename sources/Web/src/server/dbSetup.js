var mysql      = require('mysql');
var dbServices = require('./dbServices.js')

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'admin',
  password : 'root',
  database : 'pus'
});

var setup = function(){
	connection.connect();

	connection.query('CREATE TABLE IF NOT EXISTS users('+
	                'id int NOT NULL AUTO_INCREMENT,'+
	                'username VARCHAR(100) UNIQUE,'+
	                'password VARCHAR(100),'+	//TODO : add preferences list
	                'name VARCHAR(100),'+
	                'PRIMARY KEY(id))', function(err, result){
	                    if(err) {
	                        console.log(err);
	                    }
	                    else{
	                        console.log("# table USERS created");
	                    }
	                });

	connection.query('CREATE TABLE IF NOT EXISTS devices('+
	                'id int NOT NULL AUTO_INCREMENT,'+
	                'device_uuid VARCHAR(100) UNIQUE,'+
	                'device_name VARCHAR(100),'+
	                'device_registration_id VARCHAR(255),'+
	                'PRIMARY KEY(id))', function(err, result){
	                    if(err) {
	                        console.log(err);
	                    }
	                    else{
	                        console.log("# table DEVICES created");
	                    }
	                });

	connection.query('CREATE TABLE IF NOT EXISTS users_devices('+
	                'id int NOT NULL AUTO_INCREMENT,'+
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

	connection.query('CREATE TABLE IF NOT EXISTS rules('+
	                'id int NOT NULL AUTO_INCREMENT,'+
	                'device_id int NOT NULL,'+
	                'command_type VARCHAR(255),'+
	                'brightness_value int DEFAULT "0",'+
	                'ambient_light_value float(7, 2) DEFAULT "0",'+
	                'activated TINYINT(1) DEFAULT "0",'+
	                'PRIMARY KEY(id),' +
	                'FOREIGN KEY(device_id) REFERENCES devices(id) ON DELETE CASCADE)', function(err, result){
	                    if(err) {
	                        console.log(err);
	                    }
	                    else{
	                        console.log("# table rules created");
	                    }
	                });

	connection.query('CREATE TABLE IF NOT EXISTS account_preferences ('+
	                'id int NOT NULL AUTO_INCREMENT,'+
	                'name VARCHAR(100),'+
	                'preference_value varchar(100),'+
	                'user_id int,'+
	                'PRIMARY KEY(id),'+
					'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE)', function(err, result){
	                    if(err) {
	                        console.log(err);
	                    }
	                    else{
	                        console.log("# table account_preferences created");
	                    }
	                });

	connection.query("INSERT INTO users (username, password, name) VALUES ('andrei.baran@info.uaic.ro', 'andrei', 'Andrei Baran')", function(err, result){
	                    if(err) {
	                        console.log(err);
	                    }
	                    else{
	                        console.log("# default user andrei added");
	                    }
	                });

	connection.query("INSERT INTO users (username, password, name) VALUES ('laura.asoltanei@info.uaic.ro', 'laura', 'Laura Asoltanei')", function(err, result){
	                    if(err) {
	                        console.log(err);
	                    }
	                    else{
	                        console.log("# default user laura added");
	                    }
	                });

	dbServices.init(connection);
};

exports.setup = setup;
