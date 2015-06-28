var mailchimp = require('./lib/services/mailchimp');
var log = console.log.bind(console);

mailchimp.createSend("<h1>Chapter test</h1><p>Boom boom</p>", "test.md")
//mailchimp.lists()
.then(log, log);