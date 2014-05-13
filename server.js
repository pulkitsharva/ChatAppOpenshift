var path = require('path');
var http = require('http'),    express = require('express'),    faye = require('faye');
var bodyParser = require('body-parser');
var bayeux = new faye.NodeAdapter({
  mount:    '/faye',
  timeout:  45
});
var app = express();
var routes = require('./routes/index');
var server = http.createServer(app);
var port = process.env.OPENSHIFT_NODEJS_PORT || 8123 ;
var ipaddr = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
bayeux.attach(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);


app.post('/message', function(req, res) {
	try
	{
	console.log("Here:"+bayeux.getClient().publish('http://chat-yummyfoods.rhcloud.com/channel', {text: req.body.message}));
	console.log("Posting message:"+req.body.message);
	res.send(200);
	}
	catch(e)
	{
		console.log("error"+e);
	}
});
/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

server.listen(port,ipaddr);
console.log("Server up and listening on port "+port);
console.log("Server ip "+ipaddr);