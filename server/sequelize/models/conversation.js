const Sequelize = require('sequelize');

/* id는 자동생성
 */
module.exports = class Conversation extends Sequelize.Model{
    static init( sequelize ){
        return super.init({
            lastChat : {
                type: Sequelize.STRING
            }
        },{
            sequelize,
            timestamps:false,// 이 속성이 true면, createAt(생성시간), updateAt(수정시간) 필드가 자동생성
            underscored:true,
            paranoid:false, 
            modelName:'Conversation', //모델 명
            tableName:'conversation', //테이블 명
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci',
        })
    }
    static associate(db){
        db.Conversation.hasMany(db.Message,{foreignKey : "conversationId"});
        db.Conversation.belongsTo(db.User,{foreignKey : "user1", as:'User1'});
        db.Conversation.belongsTo(db.User,{foreignKey : "user2",as:"User2"});
    }
}