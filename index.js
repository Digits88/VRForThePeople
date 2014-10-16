var express = require('express'),
    app = express(),
    users = require('./users'),
    bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5000));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded() ); // to support URL-encoded bodies
app.use(express.static(__dirname + '/public'));
app.use('/users', users);
app.engine('jade', require('jade').__express);


app.get('/', function(request, response) {
    response.send('Hello World!');
});

app.get('/upload', function(request, response) {
    response.send('upload');
});

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});

