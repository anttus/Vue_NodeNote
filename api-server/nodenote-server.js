const express = require('express');
const app = express();
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8081;
const routes = require('./routes/routes');
const fs = require('fs')
const https = require('https')
const privateKey = fs.readFileSync('/etc/letsencrypt/live/anttus.ddns.net/privkey.pem', 'utf8')
const certificate = fs.readFileSync('/etc/letsencrypt/live/anttus.ddns.net/fullchain.pem', 'utf8');

const credentials = {key: privateKey, cert: certificate};

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'jade');

https.createServer(credentials, app).listen(port, () => console.log('API listening on port ' + port))

app.all('/*', function (req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", '*'); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

routes(app);
