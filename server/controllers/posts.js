import PostMessage from "../models/postMessage.js";

export const getPosts = (req, res) => {
    res.send('This is the posts route');
}
export const createPost = (req, res) => {
    res.send('Post created successfully');
} 