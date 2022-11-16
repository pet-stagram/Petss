const service = require("../services/chatService");

module.exports ={
    getChatRooms : async (req, res)=>{
        const currentUser = 1 // 현재 세션 정보
        try{
            const selectResult = await service.selectChatRooms(currentUser);
            res.status(201).json(selectResult);
        }catch(err){
            res.sendStatus(500);
        }
    },    
    getMessage : async (req, res)=>{
        const messageDto = {
            receiver : 2,//req.query.receiver
            sender : 1 // 세션아이디
        };
        await service.selectMessages(messageDto);
    },
    postMessage : async (req ,res) =>{
        const messageDto = {
            currentUser : 1,
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