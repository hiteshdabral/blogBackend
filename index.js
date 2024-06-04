require("dotenv").config();
const express = require("express");
const logger=require("morgan")
const helmet=require("helmet")
const compression = require('compression');
const mongoSanitize=require("express-mongo-sanitize")
const xss=require("xss-clean")
const cors=require('cors')
const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(logger('tiny'))
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(compression())
const { checkSchema } = require("express-validator");
const dbConnect=require("./config/db")
const authenticateUser=require("./app/middlewares/authenticate")
const upload=require("./app/middlewares/multer")
dbConnect()

//validations
const userRegistrationValidation=require("./app/validations/user-registration-validations")
const userLoginValidation=require("./app/validations/user-login-validation")
const commentValidation=require("./app/validations/comments-validation")
const postValidation=require("./app/validations/post-validation")

//controllers
const usersCtrl=require("./app/controllers/users-controller");
const postCtrl=require("./app/controllers/post-controller")
const commentCtrl=require("./app/controllers/comment-controllers")

//api calls


//user's call
app.post("/api/users/register",checkSchema(userRegistrationValidation),usersCtrl.register)
app.post("/api/users/login",checkSchema(userLoginValidation),usersCtrl.login)
app.get("/api/users/profile",authenticateUser,usersCtrl.profile)
app.put("/api/users/profile",upload.single('profilePicture'),authenticateUser,usersCtrl.update)

//post related calls
app.post("/api/posts",authenticateUser,checkSchema(postValidation),upload.single('featuredImage'),postCtrl.create)
app.get("/api/posts",postCtrl.list)
app.get("/api/posts/myposts",authenticateUser,postCtrl.my)
app.get("/api/posts/:id",postCtrl.singlePost)
app.put("/api/posts/:id",authenticateUser,postCtrl.update)
app.delete("/api/posts/:id",authenticateUser,postCtrl.delete)


//comments api
app.get("/api/posts/:postId/comments",commentCtrl.show)
app.post("/api/posts/:postId/comments",authenticateUser,checkSchema(commentValidation),commentCtrl.create)
app.put("/api/posts/:postId/comments/:commentId",authenticateUser,commentCtrl.update)
app.delete("/api/posts/:postId/comments/:commentId",authenticateUser,commentCtrl.delete)


// Listen on the defined port
const PORT = process.env.PORT ;
app.listen(PORT, () => {
    console.log(`${PORT}: Listening on`);
 // Call insert function after the server starts
});
