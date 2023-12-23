const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const sessionConfig = require('./sessions.config');
const ssr = require('../middleware/ssr');
const getUser = require('../middleware/getUser');

const config = (app) => {
  app.use(cookieParser());
  app.use(session(sessionConfig));
  app.use(express.urlencoded({ extended: true }, { limit: '100mb' }));
  app.use(express.json({ limit: '100mb' }));
  app.use(express.static('public'));
  app.use(getUser);
  app.use(ssr);
};

module.exports = config;