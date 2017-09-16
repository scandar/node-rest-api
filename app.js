const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

//connect to db
mongoose.connect("mongodb://admin:password@ds038547.mlab.com:38547/ninjas-api",{
    useMongoClient: true
});

mongoose.Promise = global.Promise;

// api
app.use(bodyParser.json());
app.use('/api', require('./routes/api'));
//error handler
app.use(function (err, req, res, next) {
    res.status(422).send({
        error: err.message,
        // message: err.errors.name.message
    });
});

// server
var port = process.env.port || 3000;
app.listen(port, function (err) {
    if (err) throw err;
    console.log('running on port ' + port);
});
