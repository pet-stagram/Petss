const {
    Conversation,
    Message
} = require("../sequelize/models/index");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const { uploadProfileImage } = require("../module/firebase");
const db = require("../sequelize/models/index");
const usersController = require("../controllers/usersController");
module.exports ={
    selectChatRooms: async (currentUser) =>{

    },
    createMessages : async (currentUser) =>{
       let conversation = await Conversation.findOne({
        where:{
            user1: {[Op.or]:[currentUser,2]},
            user2: {[Op.or]:[currentUser,2]}
        }
       });

       if(!conversation){
        conversation = await Conversation.create({
            user1: currentUser,
            user2: 2,
            last_chat : "안녕 ㅋㅋ"
        });
       }
       const newMessage = await Message.create({
        senderId: currentUser,
        receiverId : 2,
        content: "안녕 ㅋㅋ",
        conversationId: conversation.id
       });

       const updateLastChat = await Conversation.update(
        {lastChat : "안녕 ㅋㅋ"},
            {
                where:{
                    id: conversation.id
                 }
            }
         );
         console.log(updateLastChat);
    
}
}