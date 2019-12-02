const express = require('express');
var bodyParser = require('body-parser');
const joi = require('@hapi/joi');
const mongoose = require('mongoose');
// //const expressSanitizer = require('express-sanitizer');
const open = require('./routes/open.route');
const admin = require('./routes/admin.route');
const secure = require('./routes/secure.route');

const logger = require('./middlewares/logger');
const app = express();

// Set up mongoose connection
let dev_db_url = '';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(mongoDB).catch(error => logger(`Error in DB Connection ${error}`));
mongoose.connection.on('error', error => logger(`Error in DB Connection ${error}`));
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());
//app.use(express.json());

// app.use('/', express.static(__dirname));//Index file placed in base directory
app.use('/api/open', open);
app.use('/api/admin', admin);
app.use('/api/secure', secure);
// app.use('/library/dueDate', dueDate);

const port = process.env.PORT || 8080;
app.listen(port, () => logger(`Listening on port ${port}`)); // start server // set env variable laster


