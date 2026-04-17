const gachaRepo = require('./gacha-repository');

async function createPrize(name, quota) {
  return gachaRepo.createPrize(name, quota);
}

async function rollGacha(userId) {
  const todayCount = await gachaRepo.countUserGachaToday(userId);
  if (todayCount >= 5) {
    throw new Error('DAILY_LIMIT_SUDAH_TERCAPAI');
  }

  const availablePrizes = await gachaRepo.getPrizes();
  const validPrizes = availablePrizes.filter(
    (p) =>p.remaining_quota > 0
  );

  let wonPrize = null;
  const isWinning = Math.random() < 0.4;

  if (isWinning && validPrizes.length > 0) {
    const randomSelection = validPrizes[
      Math.floor(Math.random() * validPrizes.length)
    ];

    wonPrize = await gachaRepo.claimPrizeAtomically(randomSelection._id);
  }

  return gachaRepo.createGachaLog(
    userId,
    wonPrize ? wonPrize._id : null,
    wonPrize ? wonPrize.name : 'Zonk'
  );
}

async function getWinnerList() {
  const winners = await gachaRepo.getAllWinners();
  return winners.map((win) => {
    const name = win.userId?.fullName || 'Anonymous';

    let maskedName = name;

    if (name.length > 2) {
      const nameArray = name.split('');
      const lettersToHide = Math.floor(name.length * 0.5);

      let hiddenCount = 0;
      while (hiddenCount < lettersToHide) {
        const randomIndex = Math.floor(Math.random() * (name.length - 2)) + 1;

        if (nameArray[randomIndex] !== '*') {
          nameArray[randomIndex] = '*';
          hiddenCount++;
        }
      }
      maskedName = nameArray.join('');
    }

    return {
      name: maskedName,
      prize: win.prizeName,
      date: win.createdAt,
    };
  });
}

async function getUserHistory(userId) {
  const history = await gachaRepo.getUserHistory(userId);

  return history.map((log) => ({
    id: log._id,
    status: log.prizeId ? 'MENANG' : 'KALAH',
    prizeName: log.prizeName,
    date: log.createdAt,
  }));
}

module.exports = {
  createPrize,
  rollGacha,
  getWinnerList,
  getPrizes: gachaRepo.getPrizes,
  getUserHistory,
};
