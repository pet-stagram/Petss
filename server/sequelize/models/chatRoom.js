const Sequelize = require('sequelize');

/* id는 자동생성
 */
module.exports = class ChatRoom extends Sequelize.Model{
    static init( sequelize ){
        return super.init({
            
            lastChatMsg : {
                type: Sequelize.STRING(1000),
                allowNull:true,
            }
        },{
            sequelize,
            timestamps:true,// 이 속성이 true면, createAt(생성시간), updateAt(수정시간) 필드가 자동생성
            underscored:true,
            paranoid:false, 
            modelName:'ChatRoom', //모델 명
            tableName:'chat_room', //테이블 명
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci',
        })
    }
    static associate(db){
        db.ChatRoom.hasMany(db.Message);
        /* 채팅방에 해당하는 메시지의 마지막 메시지를 저장하기 위해 */
        db.ChatRoom.belongsToMany(db.User,{through:'chat_room_has_users'});
    }
}