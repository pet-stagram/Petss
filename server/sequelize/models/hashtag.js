const Sequelize = require('sequelize');
module.exports = class Hashtag extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            title:{
                type:Sequelize.STRING(20),
                allowNull:false,
                unique:true,
            },
        },{
            sequelize,
            timestamps:false,
            underscored:true,
            paranoid:false, 
            modelName:'Hashtag', // Sequelize 모델 명 Hashtag
            tableName:'hashtags', // MySQL 테이블 명 hashtags
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci',
        });
    }
    static associate(db){
        /* post 테이블과 n : m 관계에서 중간 테이블인 post_has_hashtag로 이동 */
        db.Hashtag.belongsToMany(db.Post, {through:'post_has_hashtag'});
    }
};