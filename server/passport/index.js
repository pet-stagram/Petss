const passport = require("passport");
const local = require("./localStrategy");
const { User } = require("../sequelize/models");

module.exports = () => {
    passport.serializeUser((user, done)=>{
        console.log("serializeUser",user);
        done(null, user.email);
    });

    passport.deserializeUser((id, done)=>{
        console.log("deserializeUser",id);  
        User.findOne({where:{email}})
        .then(user => done(null, user))
        .catch(err => done(err));
    });

    local();
}