const service = require("../services/adminService.js");

module.exports={
    getAdmin : async(req,res)=>{
        try{
            const userList = await service.selectListAll();
            res.status(200).send(userList);
        }catch(err){
            res.status().send("실패한이유");
        }    
        
    }

}