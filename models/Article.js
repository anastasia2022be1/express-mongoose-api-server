import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: { type: String },
    user: { type: mongoose.ObjectId }
}, { _id: false })

const articleSchema = new Schema({
    title: { type: String, required: true },
    author: { type: mongoose.ObjectId, required: true },
    keywords: [{ type: String }],
    category: { type: String },
    comments: [commentSchema]
},
    { timestamps: true });


const Article = mongoose.model("Comment", articleSchema);

export default Article;