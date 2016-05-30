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

/*app.get('/', function (req, res) {
	var message = {
		code: 200,
		content:{
			links: [{
				rel: "projects",
				href: "/projects"
			}
			]
		}
	};
    res.send(JSON.stringify(message));
});

app.get('/projects/:name', function (req, res) {
	var projectName = req.params.name;
	var found = false;
	var message, i;
	for(i=0;i< projects.length;i++){
		var project = projects[i];
		if(project.name == projectName){
			found = true;
			message ={
				code : 200,
				content : {
					name : project.name,
					student : project.student,
					content : project.content
				}
			};
			break;
		}
	}
	if(found == false){
		message = {
			code: 200,
			content: []
		};
	}
  	res.send(JSON.stringify(message));
});

app.get('/projects', function (req, res) {
	var message = {
		code: 200,
		content:{
			projects: projects,
			links: [{
				rel: "projects",
				href: "/:name"
			}
			]

		}
	};
  res.send(JSON.stringify(message));
});



app.put('/project', function (req, res) {
	var item = req.body;
	var i, project = null, found=false;
	for(i=0 ; i<projects.length ; i++){
			if(project != undefined)
		if(item.name == projects[i].name){
			projects[i].student = item.student;
			projects[i].content = item.content;
			project = projects[i];
			found=true;
			break;
		}
  	}
  	var message;
  	if(found==true){
	  	message = {
			code: 200
		};
	}else{
		message = {
			code: 404
		};
	}
	res.send(JSON.stringify(message));
});

app.delete('/project/:name', function (req, res) {
	var itemName = req.params.name;
	var i, found=false;
	for(i=0 ; i<projects.length ; i++){
		var project = projects[i];
		if(project != undefined)
		if(itemName == project.name){
			delete projects[i];
			found=true;
		}
  	}
  var message;
  	if(found==true){
	  	message = {
			code: 200
		};
	}else{
		message = {
			code: 404
		};
	}
	res.send(JSON.stringify(message));
});

app.get('/grades', function (req, res) {
	var message = {
		code: 200,
		content:{
			grades: grades
		}
	};
  res.send(JSON.stringify(message));
});

app.get('/*', function (req, res) {
	var message = {
		code: 400,
		content: null
	}
  res.send(JSON.stringify(message));
});
*/