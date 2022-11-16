const {
    User,
    ChatRoom,
    Message,
    Post,
    Heart,
    PostImage,
    Comment,
    follow,
    Invoice,
} = require("../sequelize/models/index");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const { uploadProfileImage } = require("../module/firebase");
const db = require("../sequelize/models/index");
const usersController = require("../controllers/usersController");
module.exports ={
    selectChatRooms : async (currentUser) =>{
        const UserChatRoom = db.sequelize.models.chat_room_has_users;
        const result = await UserChatRoom.findAll({
            where : {
                user_id : currentUser
            },
            raw:true
        });
        console.log(result);
    }
}