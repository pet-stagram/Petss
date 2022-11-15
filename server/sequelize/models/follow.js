const Sequelize = require('sequelize');
module.exports = class Hashtag extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            followerId:{
                type:Sequelize.INTEGER,
                allowNull:false
            },
            followingId:{
                type:Sequelize.INTEGER,
                allowNull:false
            }
        },{
            sequelize,
            timestamps:false,
            underscored:true,
            paranoid:false, 
            modelName:'Follow', // Sequelize 모델 명 Hashtag
            tableName:'follow', // MySQL 테이블 명 hashtags
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci',
        });
    }
    static associate(db){
        /* post 테이블과 n : m 관계에서 중간 테이블인 post_has_hashtag로 이동 */
        // db.Follow.hasMany(db.User,{foreignKey : "follower_id"});
        // db.Follow.hasMany(db.User,{foreignKey : "following_id"});
    }
};