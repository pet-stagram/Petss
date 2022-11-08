const service = require("../services/authService.js");


const db = require('../models')

module.exports = {
    getLogin : async(req , res, next)=>{
        try{
            //포스트 검색
            const posts = service.postFindAll();         
            res.status(200).send(posts);        
        }catch(err){
            console.error(err);
            next(err);
        }    
    },
    postRegister : (req,res)=>{
        const user = {
            id  : req.body.id,
            name : req.body.name,
            pw : req.body.pw
        }
        console.log(user)
        service.insertUser(user).then((result)=>{
            res.status(201).send("ok");
        }).catch((err)=>{
            res.status(400).send(err);
        
        });
        // const { id, name, pw} = req.body.req;
    },
    
    
    
}