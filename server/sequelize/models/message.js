const Sequelize = require('sequelize');

/* id는 자동생성
 */
module.exports = class Messanger extends Sequelize.Model{
    static init( sequelize ){
        return super.init({
          content :{
            type: Sequelize.STRING(1000),
            allowNull: false,
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
            modelName:'Messanger', //모델 명
            tableName:'messanger', //테이블 명
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci',
        })
    }
    static associate(db){
        /*  User 테이블에서 author_id이라는 컬럼명으로 foreign key 참조하여 가져옴 */
        db.Message.belongsTo(db.User,{foreignKey:"author_id"});
        /*  Chat 테이블에서 chat_id이라는 컬럼명으로 foreign key 참조하여 가져옴*/
        db.Message.belongsTo(db.ChatRoom,{foreignKey:"chat_id"});

    }
}