const Sequelize = require('sequelize');
module.exports = class Heart extends Sequelize.Model{
    static init(sequelize){
        return super.init({
        },{
            sequelize,
            timestamps:false,
            underscored:true,
            paranoid:false, 
            modelName:'Heart', // Sequelize 모델 명 Hashtag
            tableName:'heart', // MySQL 테이블 명 hashtags
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci',
        });
    }
    static associate(db){
        db.Heart.belongsTo(db.Post,{foreignKey:"post_id"});
        db.Heart.belongsTo(db.User,{foreignKey:"user_id"});
    }
};