const service = require("../services/usersService");

module.exports = {
    getMe : async (req, res)=>{
        const currentUser = req.session.u_id;
        // const currentUser = 1;
        try{
            const result = await service.selectMyInfo(currentUser);
            res.json(result);
        }catch(err){
            res.sendStatus(400);
            throw err;
        }
    },
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
                id : req.session.u_id, // 현재 세션 유저
                name : req.body.name,
                nick : req.body.nick,
                password : req.body.pw,
                selfIntro : req.body.selfIntro
            }
                try{
                    await service.updateUser(userDto);
                    res.sendStatus(201);
                }catch(err){
                    res.sendStatus(400);
                    throw err;
                }
        }
        
    },
    postUserImage : async (req, res)=>{
        const userDto = {
            id : req.session.u_id, // 현재 세션 유저
            file: req.file.path,
            isBasic: false
        }
        if(isNaN(req.params.userId)){
            res.sendStatus(404);
        }else if(false){
            /* 세션 유저 없으면 */
            res.sendStatus(401);
        }else if(userDto.file === undefined){
            res.sendStatus(400);
        } else{
                try{
                    // await service.
                    await service.updateUserImage(userDto);
                    res.sendStatus(201);
                }catch(err){
                    res.sendStatus(400);
                    throw err;
                }
            
        }
    },
    postUserImageBasic : async (req, res)=>{
        
        const userDto = {
            id : req.session.u_id, // 현재 세션 유저
            file: "public/images/basic_profile.jpeg",
            isBasic: true
        }
        if(isNaN(req.params.userId)){
            res.sendStatus(404);
        }else if(false){
            /* 세션 유저 없으면 */
            res.sendStatus(401);
        }else{
                try{
                    // await service.
                    await service.updateUserImage(userDto);
                    res.sendStatus(201);
                }catch(err){
                    res.sendStatus(400);
                    throw err;
                }
            
        }
    },
    putFollow : async (req, res) => {
        const followDto = {
            currentUser : req.session.u_id,//현재 세션 유저 idx
            profileUser : isNaN(req.body.userId)?req.body.userId:parseInt(req.body.userId)
        };
        try{
            const result = await service.updateFollow(followDto);
            if(result==="Bad Request"){
                res.sendStatus(400);
            }else if(result ==="Created"){
                res.sendStatus(201);
            }else{
                res.sendStatus(204);
            }
        }catch(err){
            res.sendStatus(400);
            throw err;
        }
    },
    postInvoice : async (req, res) => {
        if(false){
            /* 세션없으면 */
            res.sendStatus(401);
        }else{
            const invoiceDto = {
                title : req.body.title,
                content : req.body.content,
                userId : req.session.u_id//세션 유저
            };
            try{
                await service.insertInvoice(invoiceDto);
                res.sendStatus(201);
            }catch(err){
                res.sendStatus(400);
                throw err;
            }
        }
    }
}
