/* import modules */
const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session")
const cookieParser = require("cookie-parser");
const {sequelize} = require("./sequelize/models");
require("dotenv").config();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require("swagger-ui-express");
const options = require("./swagger");
const specs = swaggerJsdoc(options);


const app = express();
const PORT = process.env.SERVER_PORT;

/* Set express middleware */
app.use(cors());
app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser(process.env.COOKIE_SECRECT));
app.use(
    session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false
}}));

/* Set Sequelize(DB) */
sequelize.sync({force:false})
.then(()=>{
    console.log("db connected");
})
.catch((err)=>{
    console.error(err);
});

/* import Routes */

const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");

app.use("/auth",authRouter);
app.use("/post",postRouter);
app.use("/user",userRouter);
app.use("/admin",adminRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.listen(PORT,()=>{console.log("Running...")});