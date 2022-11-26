const service = require("../services/chatService");

module.exports ={
    getChatRooms : async (req, res)=>{
        const currentUser = 1 // 현재 세션 정보
        try{
            const selectResult = await service.selectChatRoomAll(currentUser);
            res.status(201).json(selectResult);
        }catch(err){
            res.sendStatus(500);
        }
    },    
    getMessage : async (req, res)=>{
        const messageDto = {
            me : 1,// session
            conversationId : req.query.conversation,
            offset : parseInt(req.query.offset)
        };
        try{
            const selectResult = await service.selectMessages(messageDto);
            res.status(200).json(selectResult);
        }catch(err){
            res.sendStatus(500);
            throw err;
        }
    },
    postMessage : async (req ,res) =>{
        const messageDto = {
            me : 1,
            you : 2,
            content : req.body.content
        } 
        try{
            await service.createMessages(messageDto);
            res.sendStatus(201);
        }
        catch(err){
            res.sendStatus(500);
            throw err;
        }
    }
}