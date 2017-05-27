var helmet = require('helmet');
var bodyParser = require("body-parser");


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