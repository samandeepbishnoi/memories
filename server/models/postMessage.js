import mongoose from "mongoose";
const postSchema = mongoose.Schema({
    title: {type:String ,required: true},
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount:{
        type: Number,
        default: 0,
    },
    comments: {
        type: [String],
        default: [],
    },
    createdAt:{
        type: Date,
        default: new Date(),
    }
});
const PostMessage = mongoose.model('PostMessage', postSchema);
export default PostMessage;