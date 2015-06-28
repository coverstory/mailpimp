var express = require('express');
var log = console.log.bind(console);

// Create our app
var app = express();

app.get('/', function(req, res) {
    return res.send('hello');
})

var PORT = process.env.PORT || '3000';
app.listen(PORT, function(err) {
    if(err) {
        log('Error listening:', err);
        return;
    }
    log('Listening on http://localhost:'+PORT);
});

