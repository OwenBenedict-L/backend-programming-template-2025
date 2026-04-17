// Prizes Model
module.exports = (db) =>
  db.model(
    'gachaPrizes',
    db.Schema({
      name: String,
      quota: Number,
      remaining_quota: Number,
    },{
      timestamp: true,
    })
  );
