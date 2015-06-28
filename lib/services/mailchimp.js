var Q = require('q');
var mcapi = require('mailchimp-api');

var client = new mcapi.Mailchimp('0a17c3b223d9e5e4cf8dc0c99281cef7-us11');
var LIST_ID = '34c9ce75ce';


function subscribe(email) {
    var d = Q.defer();

    // Subscribe user
    client.lists.subscribe({
        'id': LIST_ID,
        'email': {
            'email': email,
        },
    }, d.resolve, d.reject);

    return d.promise;
}

function lists() {
    var d = Q.defer();

    client.lists.list({}, d.resolve, d.reject);

    return d.promise;
}

function createSend(html, filename) {
    return create(html, filename)
    .then(function(camp) {
        return camp.id;
    })
    .then(function(campID) {
        return send(campID);
    });
}

function send(campaignId) {
    var d = Q.defer();

    client.campaigns.send({
        cid: campaignId
    }, d.resolve, d.reject);

    return d.promise;
}

function create(html, filename) {
    var d = Q.defer();

    client.campaigns.create({
        type: "regular",
        options: {
            list_id: LIST_ID,
            subject: "New Mailbook chapter: " + filename + " !",
            from_email: "aaron.omullan@gmail.com",
            from_name: "Aaron O'Mullan",
            to_name: "Readers",
        },
        content: {
            html: html,
        }
    }, d.resolve, d.reject);

    return d.promise;
}

module.exports = {};
module.exports.createSend = createSend;
module.exports.send = send;
module.exports.create = create;
module.exports.lists = lists;
