const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model{
    static init( sequelize ){
        return super.init({
            content:{
                type:Sequelize.STRING(200),
                allowNull:false,
            },
            img:{
                type:Sequelize.STRING(200),
                allowNull:true,
            },
            like:{
                type:Sequelize.NUMBER,
                allowNull:false,
                defaultValue:0,
            }
        },{
            sequelize,
            timestamp:true,   
            underscored:true,
            paranoid:false,    
            modelName:'Post',   // sequelize가 사용할 모델(테이블) 이름
            tableName:'posts',  // MySQL 테이블명
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci',
        });
    }
    static associate(db){
        /* User와 N(post) : 1(user) 관계 */
        db.Post.belongsTo(db.User);
        /* Hashtags와  N(post) : N(hashtags) 관계 -> N : M 관계의 경우 중간 테이블이 필요함. PostHashtag 테이블로 지정*/
        db.Post.belongsToMany(db.Hashtag,{through:'post_has_hashtag'});
    }
};