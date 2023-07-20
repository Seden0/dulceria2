const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/login'));
//app.use(require('./routes/signup'));
//app.use(require('./routes/auth'));
//app.use(require('./routes/resetPassw'));
///app.use(require('./routes/history-entry-exit'));
///app.use(require('./routes/entry-products'));
//app.use(require('./routes/exit-products'));
//app.use(require('./routes/search'));

//app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;