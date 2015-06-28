var path = require('path');
var kramed = require('kramed');
var express = require('express');
var log = console.log.bind(console);

var githubWebhook = require('github-webhook-handler');

var github = require('./lib/services/github');
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
    // Repo ID
    var repo = event.payload.repository.full_name;

    var filename = 'chapter1.md';

    github.raw(repo, filename)
    .then(function(contents) {
        // Render markdown to HTML
        return kramed(contents);
    })
    .then(function(html) {
        return mailchimp.createSend(html, filename);
    })
    .then(function() {
        log('Sent new chapter:', filename);
    })
    .fail(log);
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
