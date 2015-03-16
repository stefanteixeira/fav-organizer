var http = require('http');
var app = require('./config/express')();
require('./config/database.js')('mongodb://localhost/fav-organizer');

http.createServer(app).listen(app.get('port'), function() {
	console.log('Server listening on port ' + app.get('port'));
});
