import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100
    },
    content: {
        type: String,
        required: true,
    },
    tags: [{
        type: String,
        required: true
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [{
        type: String,
        ref: 'Comment'
    }]
}, {timestamps: true});

const Post = mongoose.model('Post', postSchema);

export default Post;