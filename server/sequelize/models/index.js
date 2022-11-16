const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

const User = require('./user');
const Post = require('./post');
const Hashtag = require('./hashtag');
const Invoice = require('./invoice');
const Message = require('./Message');
const Heart = require('./heart');
const Comment = require('./comment');
const PostImage = require('./postImage');
const Follow = require("./follow");
const Conversation = require("./conversation");

let sequelize = new Sequelize( config.database, config.username, config.password, config );

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;
db.Invoice = Invoice;
db.Message = Message;
db.Heart = Heart;
db.Comment = Comment;
db.PostImage = PostImage;
db.Follow = Follow;
db.Conversation = Conversation;

User.init(sequelize);
Post.init(sequelize);
Hashtag.init(sequelize);
Invoice.init(sequelize);
Message.init(sequelize);
Heart.init(sequelize);
Comment.init(sequelize);
PostImage.init(sequelize);
Follow.init(sequelize);
Conversation.init(sequelize);


User.associate(db);
Post.associate(db);
Hashtag.associate(db);
Invoice.associate(db);
Message.associate(db);
Heart.associate(db);
Comment.associate(db);
PostImage.associate(db);
Follow.associate(db);
Conversation.associate(db);

module.exports = db;