/*
 * Connect all of your endpoints together here.
 */
module.exports = function (app, router) {
    app.use('/', require('./home.js')(router));
};
