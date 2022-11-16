const service = require("../services/chatService");

module.exports ={
    getChatRooms : async (req, res)=>{
        const currentUser = 1 // 현재 세션 정보
        await service.selectChatRooms(currentUser);
    }
}