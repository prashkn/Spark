/*
 * Connect all of your endpoints together here.
 */
module.exports = function (app, router) {
    app.use('/', require('./home.js')(router))
    app.use('/users', require('./users.js'))
    app.use('/projects', require('./projects'))
};
