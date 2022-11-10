const Sequelize = require('sequelize');
module.exports = class PostImage extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            postId:{
                type:Sequelize.INTEGER,
                allowNull:false,
            },
            imgUrl:{
                type:Sequelize.STRING(1000),
                allowNull:false,
            }
        },{
            sequelize,
            timestamps:false,
            underscored:true,
            paranoid:false, 
            modelName:'PostImage', // Sequelize 모델 명 Hashtag
            tableName:'post_image', // MySQL 테이블 명 hashtags
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci',
        });
    }
    static associate(db){
        db.PostImage.belongsTo(db.Post,{foreignKey:"post_id"});
    }
};