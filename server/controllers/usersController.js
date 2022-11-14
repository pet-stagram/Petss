const service = require("../services/usersService");

module.exports = {
    getUser: async (req, res)=>{
        const userId = req.params.userId;
        try{
            const result = await service.selectUser(userId);
            res.status(200).json(result);
        }catch(err){
            res.sendStatus(400);
            throw err;
        }
    },
    getUserPosts : async (req, res) => {
        const userId = req.params.userId;
        try{
            const result = await service.selectUserPosts(userId);
            res.status(200).json(result);
        }catch(err){
            res.sendStatus(400);
            throw err;
        }
    },
    putUserInfo : async (req, res)=>{
        if(false){
            /* 세션유저 없으면 */
            res.sendStatus(401);
        }else{
            const userDto = {
                id : 1, // 현재 세션 유저
                paramsUserId : req.params.userId,
                name : req.body.name,
                nick : req.body.nick,
                password : req.body.pw,
                selfIntro : req.body.selfIntro
            }
            if(req.params.userId === userDto.id){
                try{
                    await service.updateUser(userDto);
                    res.sendStatus(201);
                }catch(err){
                    res.sendStatus(400);
                    throw err;
                }
            }else
                res.sendStatus(403);    
        }
        
    },
    postUserImage : async (req, res)=>{
        const userDto = {
            id : 1, // 현재 세션 유저
            paramsUserId : parseInt(req.params.userId),
            file: req.file
        }
        if(isNaN(req.params.userId)){
            res.sendStatus(404);
        }else if(false){
            /* 세션 유저 없으면 */
            res.sendStatus(401);
        }else if(userDto.file === undefined){
            res.sendStatus(400);
        } else{
            if(userDto.paramsUserId === userDto.id){
                try{
                    // await service.
                    await service.updateUserImage(userDto);
                    res.sendStatus(201);
                }catch(err){
                    res.sendStatus(400);
                    throw err;
                }
            }else
                res.sendStatus(403);    
        }
    },
    putFollow : async (req, res) => {
        const followDto = {
            follower : 1,//현재 세션 유저 idx
            following : req.body.userId
        };
        try{
            await service.updateFollow(followDto);
        }catch(err){
            throw err;
        }
    }

}