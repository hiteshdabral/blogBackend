const User=require("../models/user-model")
const {validationResult}=require("express-validator")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")

    require("dotenv").config()




const usersCtrl={}

usersCtrl.register=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body=req.body
    try{
        const salt=await bcryptjs.genSalt()
        const hashPassword=await bcryptjs.hash(body.passwordHash,salt)
        body.passwordHash=hashPassword
       const user= await User.create(body)
       return  res.status(201).json((user))
    }
    catch(err){
        res.status(500).json({ error: 'something went wrong'})
        console.log(body)
    }
}


usersCtrl.login=async(req,res)=>{

    const body = req.body 
    try { 
        const user = await User.findOne({email: body.email }) 
        if(user) {
            const isAuth =  bcryptjs.compare(body.passwordHash, user.passwordHash)
            if(isAuth) {
                const tokenData = {
                    id: user._id,
                }
                const token = jwt.sign(tokenData,`${ process.env.SECRET_KEY}`, { expiresIn: '7d'})
                return res.json({ token: token })
            }
            return res.status(404).json({ errors: 'invalid email / password '})
        }
        res.status(404).json({ errors: 'invalid email / password'})
    } catch(err) {
        res.status(500).json({ errors: 'something went wrong'})
    }
}


usersCtrl.profile=async(req,res)=>{
    try{
        const user=await User.findById(req.user.id)
        res.json(user)
    }
    catch(err){
        res.status(500).json({error:'something went wrong'})
    }
}


usersCtrl.update = async (req, res) => {
    try {
        const updateData = { ...req.body };
        
        if (req.file) {
            updateData.profilePicture = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            };
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { $set: updateData }, // Use $set to ensure only specified fields are updated
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" });
    }
};





module.exports=usersCtrl