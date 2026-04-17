// GachaLogs Model
module.exports = (db) =>
  db.model(
    'gachaLogs',
    db.Schema({
      userId: {
        type: db.Schema.Types.ObjectId,
        ref: 'Users',
      },
      prizeId: {
        type: db.Schema.Types.ObjectId,
        ref: 'gachaPrizes',
        default: null,
      },
      prizeName: { 
        type: String, 
        default: 'Zonk',
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }, {
      timestamp: true,
    })
  );
