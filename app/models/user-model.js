const mongoose=require("mongoose")
const {Schema,model}=mongoose

const userSchema=new Schema({
    username:String,
    email:String,
    passwordHash:String,
    bio:String,
    profilePicture:{
        data: { type: Buffer, required: true },
        contentType: { type: String, required: true },
    }
},{timeStamps:true})

const User=model("User",userSchema)

module.exports=User
