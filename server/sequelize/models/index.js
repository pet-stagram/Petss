const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

const User = require('./user');
const Post = require('./post');
const Hashtag = require('./hashtag');
const Invoice = require('./invoice');
const ChatRoom = require('./chatRoom');
const Message = require('./message');
const Heart = require('./heart');
const Comment = require('./comment');
const PostImage = require('./postImage');
const Follow = require("./follow");

let sequelize = new Sequelize( config.database, config.username, config.password, config );

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;
db.Invoice = Invoice;
db.ChatRoom = ChatRoom;
db.Message = Message;
db.Heart = Heart;
db.Comment = Comment;
db.PostImage = PostImage;
db.Follow = Follow;

User.init(sequelize);
Post.init(sequelize);
Hashtag.init(sequelize);
Invoice.init(sequelize);
ChatRoom.init(sequelize);
Message.init(sequelize);
Heart.init(sequelize);
Comment.init(sequelize);
PostImage.init(sequelize);
Follow.init(sequelize);



User.associate(db);
Post.associate(db);
Hashtag.associate(db);
Invoice.associate(db);
ChatRoom.associate(db);
Message.associate(db);
Heart.associate(db);
Comment.associate(db);
PostImage.associate(db);
Follow.associate(db);


module.exports = db;