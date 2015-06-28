function isMail(msg) {
    return msg.toLowerCase().indexOf('mail') === 0;
}

function filename(msg) {
    return msg.slice(4).trim();
}

module.exports = {};
module.exports.isMail = isMail;
module.exports.filename = filename;
