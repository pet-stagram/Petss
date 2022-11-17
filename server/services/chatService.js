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
                required:true,
                // nest:true,
                include: [
                    {
                        model: User,
                        as: 'User1',
                        attribute:[["id","name","image"]],
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
                        attribute:[["id","name","image"]],
                        where: {
                            id: {
                                [Op.notLike]: currentUser,
                            }
                        },
                        required:false
                    }
                ],
            });
            const partners = [];
            conversations.forEach((conversation) => {
                if (conversation.user1 === currentUser) {
                    partners.push(conversation.user2);
                } else {
                    partners.push(conversation.user1);
                }
            });
            console.log(partners);
            User.findAll({});

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
                last_chat: content,
            });
        }
        const newMessage = await Message.create({
            senderId: currentUser,
            receiverId: 2,
            content: content,
            conversationId: conversation.id,
            sendAt: Date.now(),
        });
        const updateLastChat = await Conversation.update(
            { lastChat: content },
            {
                where: {
                    id: conversation.id,
                },
            }
        );
    },
};
