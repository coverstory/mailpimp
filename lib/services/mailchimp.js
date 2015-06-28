var Q = require('q');
var mcapi = require('mailchimp-api');

var client = new mcapi.Mailchimp('0a17c3b223d9e5e4cf8dc0c99281cef7-us11');
var LIST_ID = '134525';


function subscribe(email) {
    var d = Q.deferred();

    // Subscribe user
    client.lists.subscribe({
        'id': LIST_ID,
        'email': {
            'email': email,
        },
    }, d.resolve, d.reject);

    return d.promise;
}

function sendCreate(html) {
    return create(html)
    .then(function(camp) {
        return camp.auto.campaign_id
    })
    .then(function(campID) {
        return send(campID);
    });
}

function send(campaignId) {
    var d = Q.deferred();

    client.campaigns.send({
        cid: campaignId
    }, d.resolve, d.reject);

    return d.promise;
}

function create(html) {
    var d = Q.deferred();

    client.campaigns.create({
        list_id: LIST_ID,
        subject: "New Mailbook chapter !",
        from_email: "Aaron O'Mullan",
        from_name: 'Aaron',
        to_name: 'Readers',
        content: {
            html: html,
        }
    }, d.resolve, d.reject);

    return d.promise;
}

module.exports = {};
module.exports.sendCreate = sendCreate;
module.exports.send = send;
module.exports.create = create;