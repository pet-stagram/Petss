const { Conversation, Message, User } = require("../sequelize/models/index");
const { Op, Model } = require("sequelize");
const sequelize = require("sequelize");
const { uploadProfileImage } = require("../module/firebase");
const db = require("../sequelize/models/index");
const usersController = require("../controllers/usersController");
module.exports = {
    selectChatRoomAll: async (currentUser) => {
        try {
            const conversations = await Conversation.findAll({
                order:[["updatedAt","DESC"]]
                ,
                where: {
                    [Op.or]: [{ user1: currentUser }, { user2: currentUser }],

                },
                include: [
                    {
                        model: User,
                        as: 'User1',
                        attributes:["id","name","image","nick"],
                        where: {
                            id: {
                                [Op.notLike]: currentUser,
                            }
                        },
                        required:false
                    },
                    {
                        model: User,
                        as: 'User2',
                        attributes:["id","name","image","nick"],
                        where: {
                            id: {
                                [Op.notLike]: currentUser,
                            }
                        },
                        required:false
                    }
                ],
            });

            /* User1이나 User2가 null이면 null이 아닌 User가 상대방임 */
            return conversations;
        } catch (err) {
            console.error(err);
        }
    },
    selectMessages: async (messageDto) => {
        const { me, conversationId, lastId } = messageDto;
        
        const where = {
            conversation_id : conversationId
        };
        
        if(lastId){
            where.id = { [Op.lt] : lastId }
        }
        try{
        const messages = await Message.findAndCountAll({
            limit : 15,
            order:[["sendAt","DESC"]],
            where,
            raw:true,
            nest:true,
            /* Sender 혹은 Receiver가 null이면 나, 아니면 상대방( 이름, 프로필 사진 출력하기 위해 ) */
            include : [
                {
                    model: User,
                    attributes:["id","name","image","nick"],
                    as: "Sender",
                    where:{
                        [Op.not] : {id: me}
                    }, 
                    required:false
                },
                {
                    model: User,
                    as: "Receiver",
                    attributes:["id","name","image","nick"],
                    where:{
                        [Op.not] : {id: me}
                    },
                    required:false
                }
            ]
        });
        /* 내가 누군지에 따라 읽음표시 */
      await Conversation.update(
            {
                user1Read: true
            },
            {
                where:{
                    id : conversationId, 
                    user1: me
                }
            }
        );
        await Conversation.update(
            {
                user2Read: true
            },
            {
                where:{
                    id : conversationId, 
                    user2: me
                }
            }
        );
        return messages;
    }catch(err){
        console.error(err);
    }
    },
    createMessages: async (messageDto) => {
        const { conversation, comment, sender, me, partner } = messageDto;
        /* 현재 유저, 상대방, 채팅 내용 가져와야함 */
       try{
        let conversation = await Conversation.findOne({
            where: {
                user1: { [Op.or]: [me, partner] },
                user2: { [Op.or]: [me, partner] },
            },
        });
        if (!conversation) {
            conversation = await Conversation.create({
                user1: me,
                user2: partner,
                user1Read: false,
                user2Read: false,
                last_chat: comment,
                updatedAt: Date.now()
            });
        }
        const newMessage = await Message.create({
            senderId: me,
            receiverId: partner,
            content: comment,
            conversationId: conversation.id,
            sendAt: Date.now(),
        });
        
        const updateLastChat = await Conversation.update(
            { 
            lastChat: comment,
            updatedAt: Date.now(),
            },
            {
                where: {
                    id: conversation.id,
                },
            }
        );
        /* 메시지 보낸 사람은 바로 읽음으로 설정 */
        /* 만약 senderId가 user1이면 user1Read true, user2이면 user2Read true */
        await Conversation.update(
            {
                user1Read: true
            },
            {
                where:{
                    id : conversation.id, 
                    user1: newMessage.senderId
                }
            }
        );
        await Conversation.update(
            {
                user2Read: true
            },
            {
                where:{
                    id : conversation.id, 
                    user2: newMessage.senderId
                }
            }
        )
    }catch(err){
        console.error(err);
    }
    },
};
