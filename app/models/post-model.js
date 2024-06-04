const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const postSchema = new Schema(
  {
    title: String,
    content: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    }],
    tags: [String],
    featuredImage: {
      data: { type: Buffer, required: true },
      contentType: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const Post=model('Post',postSchema)



module.exports=Post