const Sequelize = require('sequelize');
module.exports = class Comment extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            content:{
                type:Sequelize.STRING(1000),
                allowNull:true
            }
        },{
            sequelize,
            timestamps:true,
            underscored:true,
            paranoid:false, 
            modelName:'Comment', // Sequelize 모델 명 Hashtag
            tableName:'comment', // MySQL 테이블 명 hashtags
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci',
        });
    }
    static associate(db){
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
    }
};