
module.exports = {
    isLogginedIn : (req,res,next)=>{
        if(req.session.u_id){
            next();
        }else{//로그인 상태가 아니라면,
            res.sendStatus(403);//로그인필요메세지
        }
    },

    isNotLogginedin: (req,res,next)=>{
        if(!req.session.u_id){
            next();
        }else{
            const message ="로그인한 상태입니다.";
            res.status(400).json({
                message,
            })
        }
    }
}