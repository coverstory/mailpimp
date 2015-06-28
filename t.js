var mailchimp = require('./lib/services/mailchimp');
var github = require('./lib/services/github');
var log = console.log.bind(console);

//mailchimp.createSend("<h1>Chapter test</h1><p>Boom boom</p>", "test.md")
//mailchimp.lists()
//.then(log, log);

github.raw('AaronO/mailbook', 'chapter1.md')
.then(log, log);