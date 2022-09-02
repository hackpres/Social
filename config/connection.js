const { connect, connection } = require('mongoose');

connect('mongodb://localhost/social', {
    userNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;