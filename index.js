var path = require('path');
var express = require('express');
var log = console.log.bind(console);

var githubWebhook = require('github-webhook-handler');

var mailchimp = require('./lib/services/mailchimp');

// Create our app
var app = express();

// Homepage
app.get('/', function(req, res) {
    return res.send('hello');
});

app.get('/button/subscribe', function(req, res) {
    return res.redirect('http://eepurl.com/brJmtr');
});

// Handle webhooks
var webhook = githubWebhook({ path: '/webhook', secret: 'test', });
app.post('/webhook', function(req, res) {
    webhook(req, res, function(err) {
        res.statusCode = 404;
        res.end('Webhook error !');
    })
})

webhook.on('error', function (err) {
  console.error('Error:', err.message)
});

webhook.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref)
});


// Static files
app.use('/static/', express.static(path.join(__dirname, 'public')));

// Listen
var PORT = process.env.PORT || '3000';
app.listen(PORT, function(err) {
    if(err) {
        log('Error listening:', err);
        return;
    }
    log('Listening on http://localhost:'+PORT);
});
