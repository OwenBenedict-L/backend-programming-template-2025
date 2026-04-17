const gachaService = require('./gacha-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function createPrize(request, response, next) {
  try {
    const { name, quota } = request.body;
    const prize = await gachaService.createPrize(name, quota);
    return response.status(201).json({ message: 'Prize has been created' });
  } catch (error) {
    return next(error);
  }
}

async function playGacha(request, response, next) {
  try {
    const { userId } = request.body;
    if (!userId) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'userId harus diisi');
    }
    const result = await gachaService.rollGacha(userId);
    return response.status(200).json({
      prizeName: result.prizeName,
      status: result.prizeId ? 'MENANG' : 'KALAH',
      at: result.createdAt,
    });
  } catch (error) {
    if (error.message === 'DAILY_LIMIT_SUDAH_TERCAPAI') {
      return next(
        errorResponder(
          errorTypes.FORBIDDEN,
          'Maaf anda sudah mencapai limit gacha harian. Silahkan datang lagi besok!!!'
        )
      );
    }
    return next(error);
  }
}

async function getPrizesStatus(request, response, next) {
  try {
    const prizes = await gachaService.getPrizes();
    return response.status(200).json(prizes);
  } catch (error) {
    next(error);
  }
}

async function getWinners(request, response, next) {
  try {
    const winners = await gachaService.getWinnerList();
    return response.status(200).json(winners);
  } catch (error) {
    next(error);
  }
}

async function getUserHistory(request, response, next) {
  try {
    const { userId } = request.params;

    if (!userId) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'userID harus diisi');
    }

    const history = await gachaService.getUserHistory(userId);

    return response.status(200).json(history);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createPrize,
  playGacha,
  getPrizesStatus,
  getWinners,
  getUserHistory,
};
