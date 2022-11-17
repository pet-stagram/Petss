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
                where: {
                    [Op.or]: [{ user1: currentUser }, { user2: currentUser }],

                },
                
                include: [
                    {
                        model: User,
                        as: 'User1',
                        attributes:["id","name","image"],
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
                        attributes:["id","name","image"],
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
            console.log(err);
            throw err;
        }
    },
    selectMessages: async (messageDto) => {
        const { receiver, sender } = messageDto;
        const conversation = await Conversation.findOne({
            where: {
                user1: { [Op.or]: [receiver, sender] },
                user2: { [Op.or]: [receiver, sender] },
            },
        });
    },
    createMessages: async (messageDto) => {
        const { currentUser, content } = messageDto;
        /* 현재 유저, 상대방, 채팅 내용 가져와야함 */
        let conversation = await Conversation.findOne({
            where: {
                user1: { [Op.or]: [currentUser, 2] },
                user2: { [Op.or]: [currentUser, 2] },
            },
        });
        if (!conversation) {
            conversation = await Conversation.create({
                user1: currentUser,
                user2: 2,
                user1Read: false,
                user2Read: false,
                last_chat: content,
                updatedAt: Date.now()
            });
        }
        const newMessage = await Message.create({
            senderId: currentUser,
            receiverId: 2,
            content: content,
            conversationId: conversation.id,
            sendAt: Date.now(),
        });
        console.log(newMessage.senderId);
        const updateLastChat = await Conversation.update(
            { lastChat: content,
                updatedAt: Date.now(),
            },
            {
                where: {
                    id: conversation.id,
                },
            }
        );
    },
};
