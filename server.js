var http = require('http');
var app = require('./config/express')();
require('./config/passport')();
require('./config/database.js')('mongodb://52.32.97.145:27017/fav-organizer');

http.createServer(app).listen(app.get('port'), function() {
	console.log('Server listening on port ' + app.get('port'));
});
