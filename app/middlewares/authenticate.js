const jwt=require("jsonwebtoken")
require("dotenv").config()
const authenticateUser=(req,res,next)=>{
    const token=req.headers['authorization']
    if(!token){
        // console.log(token)

        return res.status(400).json({error:'token is required'})
    }
    try{
        const tokenData=jwt.verify(token,`${ process.env.SECRET_KEY}`)
        console.log(tokenData)
        req.user={
            id:tokenData.id
        }
        next()
    }
    catch(err){
        return res.status(400).json({error:err})
    }
}

module.exports=authenticateUser