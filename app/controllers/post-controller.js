const Post=require("../models/post-model")
const multer = require('multer');
const postCtrl={}


postCtrl.list=async(req,res)=>{
    try{
        const posts=await Post.find();
        res.json(posts)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"something went wrong"})
    }
}


postCtrl.create =  async (req, res) => {
    const body = req.body;
    const userId = req.user.id;
  
    try {
      const post = new Post({
        ...body,
        author: userId
      });
       
    if (req.file) {
      post.featuredImage.data = req.file.buffer;
      post.featuredImage.contentType = req.file.mimetype;
    }


      await post.save();
      res.json(post);
    } catch (err) {
    
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    }
  };

postCtrl.singlePost=async(req,res)=>{
    try{
        const id=req.params.id
       const post=await Post.findById(id).populate('author')
       res.json(post) 
    }
    catch(err){
        res.status(500).json({error:"something went wrong"})
        
    }
}

postCtrl.update=async(req,res)=>{
    const body=req.body
    const id=req.params.id
    try{
        const post=await Post.findByIdAndUpdate(id,body,{new:true})
        res.json(post)
    }
    catch(err){
        res.status(500).json({error:"something went wrong"})
        
    }
}


postCtrl.delete=async(req,res)=>{
    const id=req.params.id
    try{
        const post=await Post.findByIdAndDelete(id)
        res.json(post)
    }
    catch(err){
        res.status(500).json({error:"something went wrong"})

    }
}
postCtrl.my = async (req, res) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(400).json({ error: "User ID not provided in request" });
      }
      const posts = await Post.find({ author: req.user.id });
      res.json(posts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    }
  };
module.exports=postCtrl