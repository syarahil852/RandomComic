var helmet = require('helmet');
var bodyParser = require("body-parser");
var path = require('path');
var morgan = require('morgan');

var fs = require('fs');
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
    flags: 'a'
});


module.exports = function(app) {
    app.use(helmet());
    app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', {
        stream: accessLogStream
    }));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.set("view engine", "ejs");

    app.listen(8070, '0.0.0.0', function() {
        console.log("Listening on port 8070");
    });
};