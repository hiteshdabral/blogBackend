const commentCtrl = {};
const Comment = require("../models/comments-model");


commentCtrl.create = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user.id;
  const body = req.body;
  try {
    
    body.author = userId;
    body.post = postId;

    
    const comment = await Comment.create(body);
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

commentCtrl.show = async (req, res) => {
  try {
    const postId = req.params.postId;
    
    
    const comments = await Comment.find({ post: postId }).populate('author');
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

commentCtrl.update = async (req, res) => {
  const commentId = req.params.commentId;
  const body = req.body;
  try {
   
    delete body.author;
    delete body.post;

    const comment = await Comment.findByIdAndUpdate(commentId, body, {
      new: true,
    });
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

commentCtrl.delete = async (req, res) => {
  const commentId = req.params.commentId;
  try {
  
    const comment = await Comment.findByIdAndDelete(commentId);
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = commentCtrl;
