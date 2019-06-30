const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');
const MongoStore = require('connect-mongo')(session);

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

//Initiate our app
const app = express();

//Configure our app
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './frontend/public')));

if(!isProduction) {
  app.use(errorHandler());
}

//Configure Mongoose
mongoose.connect('mongodb+srv://sheep:sheep@web-final-etf7x.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true }).then(()=>console.log('Connect to db'));
app.use(session({
    secret: 'passport-tutorial',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
mongoose.set('debug', true);

require('./models/Users');
require('./models/todo');
require('./models/schedule');
require('./models/vote');
require('./models/project');
require('./config/passport');
app.use(require('./routes'));

//Error handlers & middlewares
if(!isProduction) {
  app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500);


  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

const port = 3001;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));