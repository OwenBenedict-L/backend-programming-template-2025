const express = require('express');
const gachaController = require('./gacha-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/gacha', route);

  route.post('/create', gachaController.createPrize);
  route.get('/prizes', gachaController.getPrizesStatus);
  route.post('/roll', gachaController.playGacha);
  route.get('/winners', gachaController.getWinners);
  route.get('/history/:userId', gachaController.getUserHistory);
};
