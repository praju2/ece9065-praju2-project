const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const joi = require('@hapi/joi');
const mongoose = require('mongoose');
const cors = require('cors');


const open = require('./routes/open.route');
const admin = require('./routes/admin.route');
const secure = require('./routes/secure.route');
const logger = require('./middlewares/logger');
const validateRouteAccess=require('./middlewares/validateRouteAccess.middleware');
const env_path=process.cwd()+'\\config\\env-config.env';
require('dotenv').config({path : env_path}); 

const app = express();
app.use(cors());

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


app.use(passport.initialize());
require('./config/passport-config')(passport);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});



app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));



console.log("got the req1");

app.use('/api/open', open);
app.use('/api/admin',[passport.authenticate('jwt', {session: false}),validateRouteAccess.minPermLvlRqd('admin')], admin);
app.use('/api/secure',[passport.authenticate('jwt', {session: false}),validateRouteAccess.minPermLvlRqd('user')], secure);
//app.use('/api/secure', secure);


const port = process.env.PORT ;
app.listen(port, () => logger(`Listening on port ${port}`)); // start server // set env variable laster


