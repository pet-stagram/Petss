const Sequelize = require('sequelize');
module.exports = class Hashtag extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            title :{
                type:Sequelize.STRING(20),
                allowNull:false
            }
            ,
            content:{
                type:Sequelize.STRING(1000),
                allowNull:false
            }
        },{
            sequelize,
            timestamps:true,
            underscored:true,
            paranoid:false, 
            modelName:'Invoice', // Sequelize 모델 명 Hashtag
            tableName:'invoice', // MySQL 테이블 명 hashtags
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci',
        });
    }
    static associate(db){
        /* users 테이블과 1 : n 관계에서 중간 테이블인 PostHashtag로 이동 */
        db.Invoice.belongsTo(db.User);
    }
};