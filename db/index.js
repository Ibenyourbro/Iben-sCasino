const sequelize = require('sequelize');
const { Sequelize } = require('sequelize');
const orm = new Sequelize('poker_database', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});
const User = orm.define('User', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  sub: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  picture: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  money: {
    type: Sequelize.INTEGER,
    defaultValue: 1000,
  },
});

const PokerGames = orm.define('PokerGames', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  deckId: {
    type: Sequelize.STRING(255),
  },
  userId: {
    type: Sequelize.STRING(255),
  },
  buyIn: {
    type: Sequelize.INTEGER,
    defaultValue: 50,
  },

  moneyOnTable: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  bigBlind: {
    type: Sequelize.INTEGER,
    defaultValue: 10,
  },

  hand: {
    type: Sequelize.STRING,
    defaultValue: '',
    get() {
      return this.getDataValue('hand').split(',');
    },
    set(val) {
      return this.setDataValue('hand', val.join(','));
    },
  },
  dealerHand: {
    type: Sequelize.STRING,
    defaultValue: '',
    get() {
      return this.getDataValue('dealerHand').split(',');
    },
    set(val) {
      return this.setDataValue('dealerHand', val.join(','));
    },
  },
  flop: {
    type: Sequelize.STRING,
    defaultValue: '',
    get() {
      return this.getDataValue('flop').split(',');
    },
    set(val) {
      return this.setDataValue('flop', val.join(','));
    },
  },
  takeHome: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  netEarnings: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

User.hasMany(PokerGames, {
  foreignKey: {
    name: 'userId',
  },
});

User.belongsToMany(User, {
  through: 'friendList',
  as: 'Friends',
});

// User.bulkCreate([
//   {
//     sub: 'ad453aewqesd43asd',
//     name: 'bam',
//     email: 'dadaPOODd@gmail.com',
//     picture: 'das.com',
//   },
//   {
//     sub: 'ad4aadsd43asd',
//     name: 'Henry',
//     email: 'dqed@gmail.com',
//     picture: 'ddsdsat.com',
//   },
//   {
//     sub: 'ad4dadsad3asdqq43asd',
//     name: 'Ale',
//     email: 'dasadadsad@gmail.com',
//     picture: 'ddqqet.com',
//   },
//   {
//     sub: 'ad4qeq31asd',
//     name: 'Steve',
//     email: 'dadaqqqq655d@gmail.com',
//     picture: 'ddsasadas423dasdqwt.com',
//   },
//   {
//     sub: 'ad453asd43asd',
//     name: 'John',
//     email: 'dadadad@gmail.com',
//     picture: 'ddsasadasdasdqwt.com',
//   },
// ]);

orm
  .sync()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

exports.User = User;
// exports.Friends = Friends;
exports.PokerGames = PokerGames;
