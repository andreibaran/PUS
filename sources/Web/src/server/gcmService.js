var gcm = require('node-gcm');
 
// Set up the sender with you API key, prepare your recipients' registration tokens. 
var sender = new gcm.Sender('AIzaSyDMKofeJbQ75EKb1XQ6sIVJLTS0_Tpuhh0');


module.exports = {
	sendMessageToDevice: function(registrationId, messageData) {
		var message = new gcm.Message({
		    data: messageData
		});
		console.log(messageData);
		

		var regTokens = [];
		regTokens.push(registrationId);

		sender.send(message, { registrationTokens: regTokens }, function (err, response) {
			if(err) {
				console.error(err);
			} else {
				console.log(response);
			}
		});
	}
};


