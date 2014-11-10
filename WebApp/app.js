var express  = require('express');
var app      = express();
var port     = process.env.PORT || 80;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var path = require('path');
var fs = require('fs');
var http = require('http');
var server = http.createServer(app);



var configDB = require('./config/database.js');
mongoose.connect(configDB.url); 

