const Sequelize = require('sequelize');

/* id는 자동생성
 */
module.exports = class User extends Sequelize.Model{
    static init( sequelize ){
        return super.init({
            email:{
                type:Sequelize.STRING(50),
                allowNull:true,
                unique:true
             },
            nick:{
                type:Sequelize.STRING(30),
                allowNull:false,
            }, 
            password:{
                type:Sequelize.STRING(100),
                allowNull:true,	
            }, 
            provider:{
                type:Sequelize.STRING(20),
                allowNull:false,
                defaultValue:'local',
            }, 
            snsid:{
                type:Sequelize.STRING(50),
                allowNull:true,
            },
        },{
            sequelize,
            timestamps:true,// 이 속성이 true면, createAt(생성시간), updateAt(수정시간) 필드가 자동생성
            underscored:false,
            paranoid:false, 
            modelName:'User', //모델 명
            tableName:'users', //테이블 명
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci',
        })
    }
    static associate(db){
        db.User.hasMany(db.Post);
 
        /* Follow 테이블에 1 : N 관계 
            다른 사람이 해당 유저 팔로우 시 Follow 테이블 followerId 속성에 해당 유저 id 들어감
            반대의 경우 해당 유저 id가 followingId에 들어감 */
        db.User.belongsToMany(db.User, {foreignKey:'followingId', as:'Followers',through:'Follow'}); 

        db.User.belongsToMany(db.User, {foreignKey:'followerId', as:'Followings', through:'Follow'}); 
    }
}