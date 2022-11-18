require('dotenv').config();
const env = process.env;

const development = {
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  host: env.DB_HOST,
  timezone:"+09:00",             // 한국 timezone 설정 
  dialectOptions:{
    dateStrings:true,            // 가져올 때 string으로 가져오기 
    typeCast:true
  },
  dialect: "mysql", // 3306으로 포트포워딩
  logging : false
};

const production = {
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  host: env.DB_HOST,
  timezone:"+09:00",             // 한국 timezone 설정 
  dialectOptions:{
    dateStrings:true,            // 가져올 때 string으로 가져오기 
    typeCast:true
  },
  dialect: "mysql", // 3306으로 포트포워딩
  logging : false
};

const test = {
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  host: "127.0.0.1",
  timezone:"+09:00",             // 한국 timezone 설정 
  dialectOptions:{
    dateStrings:true,            // 가져올 때 string으로 가져오기 
    typeCast:true
  },
  dialect: "mysql", // 3306으로 포팅
  logging : false
};

module.exports = { development, production, test };