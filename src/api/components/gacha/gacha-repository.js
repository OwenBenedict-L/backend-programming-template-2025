const { gachaPrizes } = require('../../../models');
const { gachaLogs } = require('../../../models');

async function createPrize(name, quota) {
  return gachaPrizes.create({
    name,
    quota,
    remaining_quota: quota,
  });
}

async function getPrizes() {
  return gachaPrizes.find({});
}

async function claimPrizeAtomically(id) {
  return gachaPrizes.findOneAndUpdate(
    { _id: id, remaining_quota: { $gt: 0 } },
    { $inc: { remaining_quota: -1 } },
    { new: true }
  );
}

async function countUserGachaToday(userId) {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  return gachaLogs.countDocuments({
    userId,
    createdAt: { $gte: startOfDay, $lte: endOfDay },
  });
}

async function createGachaLog(userId, prizeId, prizeName) {
  return gachaLogs.create({ userId, prizeId, prizeName });
}

async function getAllWinners() {
  return gachaLogs.find({ prizeId: { $ne: null } })
    .populate('userId')
    .sort({ createdAt: -1 });
}

async function getUserHistory(userId) {
  const { ObjectId } = gachaLogs.base.Types;

  return gachaLogs.find({ userId: new ObjectId(userId) })
    .populate('prizeId')
    .sort({ createdAt: -1 });
}

module.exports = {
  createPrize,
  getPrizes,
  claimPrizeAtomically,
  countUserGachaToday,
  createGachaLog,
  getAllWinners,
  getUserHistory,
};
