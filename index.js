var path = require('path');
var express = require('express');
var log = console.log.bind(console);

// Create our app
var app = express();

// Homepage
app.get('/', function(req, res) {
    return res.send('hello');
});

// Static files
app.use('/static/', express.static(path.join(__dirname, 'public')));

var PORT = process.env.PORT || '3000';
app.listen(PORT, function(err) {
    if(err) {
        log('Error listening:', err);
        return;
    }
    log('Listening on http://localhost:'+PORT);
});

