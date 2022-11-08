const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

const User = require('./user');
const Post = require('./post');
const Hashtag = require('./hashtag');
const Invoice = require('./invoice');

let sequelize = new Sequelize( config.database, config.username, config.password, config );

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;
db.Invoice = Invoice;

User.init(sequelize);
Post.init(sequelize);
Hashtag.init(sequelize);
Invoice.init(sequelize);

User.associate(db);
Post.associate(db);
Hashtag.associate(db);
Invoice.associate(db);

module.exports = db;