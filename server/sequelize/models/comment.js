const Sequelize = require('sequelize');
module.exports = class Comment extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            content:{
                type:Sequelize.STRING(1000),
                allowNull:true
            },
            createdAt: {
                field: 'created_at',
                type: Sequelize.DATE,
            },
            updatedAt: {
                field: 'updated_at',
                type: Sequelize.DATE,
            },
        },{
            sequelize,
            timestamps:false,
            underscored:true,
            paranoid:false, 
            modelName:'Comment', // Sequelize 모델 명 Hashtag
            tableName:'comment', // MySQL 테이블 명 hashtags
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci',
        });
    }
    static associate(db){
        db.Comment.belongsTo(db.User,{foreignKey : "user_id"});
        db.Comment.belongsTo(db.Post,{foreignKey : "post_id"});
    }
};