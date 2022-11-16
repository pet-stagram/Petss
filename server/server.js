/* import modules */
const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const fileStore = require("session-file-store")(session);
const cookieParser = require("cookie-parser");
const {sequelize} = require("./sequelize/models");
require("dotenv").config();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require("swagger-ui-express");
const options = require("./swagger");
const specs = swaggerJsdoc(options);
const rateLimit = require("express-rate-limit");
/* multer */
const multer = require('multer');
const socket = require("./module/socket");
const http = require("http");

const app = express();
const PORT = process.env.SERVER_PORT;

const server = http.createServer(app);
socket(server);

/* Set express middleware */
app.use(cors());
app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser(process.env.COOKIE_SECRECT));
app.use(
    session({
    resave:false,
    saveUninitialized:true,
    secret:process.env.COOKIE_SECRET,
    store: new fileStore({checkPeriod:1000*60*5}),
    cookie:{
        httpOnly:true,
        secure:false,
        maxAge:1000*60*5,
}}));

// app.use(passport.initialize());
// app.use(passport.session());

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
const postRouter = require("./routes/posts");
const userRouter = require("./routes/users");
const adminRouter = require("./routes/admin");
const passport = require("./sequelize/models/passport");

app.use('/uploads', express.static('uploads'));
app.use("/auth",authRouter);
app.use("/posts",postRouter);
app.use("/users",userRouter);
app.use("/admin",adminRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.listen(PORT,()=>{console.log("Running...")});