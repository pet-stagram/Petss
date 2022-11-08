const db = require('../sequelize/models')
const { Post, User, Hashtag } = require('../sequelize/models');

module.exports = {
    postFindAll :async ()=>{
        const posts = await Post.findAll({
            order:[[ 'id', 'DESC' ]],
        });

        return posts;
    },

    insertUser : (user)=>{
        return new Promise((resolve, reject)=>{
            User.create({email:"min@min.com",nick:user.name,password:user.pw,provider:"",snsid:user.id}).then((result)=>{
                resolve("good")
            }).catch((err)=>{
                reject(err);
            })
        
        })
    }
}