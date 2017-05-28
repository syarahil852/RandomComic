var helmet = require('helmet');
var bodyParser = require("body-parser");
// logging
var dateFormat = require('dateformat');
require('log-timestamp')(function() {
    return '[' + dateFormat("m/d/yy HH:MM:ss Z") + '] %s';
});
module.exports = function(app) {
    app.use(helmet());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.set("view engine", "ejs");

    app.listen(8070, 'localhost', function() {
        console.log("Listening on port 8070");
    });
};