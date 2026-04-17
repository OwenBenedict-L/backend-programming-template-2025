const express = require('express');

const users = require('./components/users/users-route');
const gacha = require('./components/gacha/gacha-route');


module.exports = () => {
  const app = express.Router();

  users(app);
  gacha(app);

  return app;
};
