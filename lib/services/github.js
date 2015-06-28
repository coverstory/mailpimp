var Q = require('q');
var request = require('request');

// Spits the contents of
function raw(repo, filename) {
    var d = Q.defer();

    request.get(rawUrl(repo, filename), function(err, response, body) {
        if(err) {
            return d.reject(err);
        }
        return d.resolve(body);
    })

    return d.promise;
}

function rawUrl(repo, filename) {
    return "https://raw.githubusercontent.com/"+repo+"/master/"+filename;
}

module.exports = raw;
module.exports.raw = raw;
module.exports.url = rawUrl;
