const Sequelize = require('sequelize');

/* id는 자동생성
 */
module.exports = class Message extends Sequelize.Model{
    static init( sequelize ){
        return super.init({
          content :{
            type: Sequelize.STRING(1000),
            allowNull: false,
          },
          senderId: {
            type: Sequelize.INTEGER
          },
          receiverId:{
            type: Sequelize.INTEGER
          },
          sendAt : {
            type: Sequelize.DATE,
            field:"send_at"
          }
        },{
            sequelize,
            timestamps:false,// 이 속성이 true면, createAt(생성시간), updateAt(수정시간) 필드가 자동생성
            underscored:true,
            paranoid:false, 
            modelName:'Message', //모델 명
            tableName:'message', //테이블 명
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci',
        })
    }
    static associate(db){

        db.Message.belongsTo(db.User,{foreignKey:"senderId",as:"Sender"});
        db.Message.belongsTo(db.User,{foreignKey:"receiverId",as:"Receiver"});
        db.Message.belongsTo(db.Conversation,{foreignKey:"conversationId"});
        
    }
}