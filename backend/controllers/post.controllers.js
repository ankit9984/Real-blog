import { message } from "antd";
import Post from "../models/post.models.js";
import User from "../models/user.model.js";
import Comment from "../models/comment.model.js";

const createPost = async (req, res) => {
    try {
        const {userId} = req.user;
        const {title, content, tags, author} = req.body;

        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({error: 'User not found'})
        }

        if(!title || !content || !tags){
            return res.status(404).json({error: 'All fields required'})
        }

        const newPost = new Post({
            title,
            content,
            tags,
            author: userId
        });

        await newPost.save();
        
        await User.findByIdAndUpdate(userId, {$push: {posts: newPost._id}})

        // user.posts.push(newPost._id);
        // await user.save();

        res.status(201).json(newPost);

    } catch (error) {
        console.error('Error in createPost: ', error);
        res.status(500).json('Internal server error')
    }
    
};

const deletePost = async (req, res) => {
    try {
        const {postId} = req.params;
        const {userId} = req.user;
    
        const user = await User.findById(userId);
        const post = await Post.findById(postId);
    
        if(!post){
            return res.status(404).json({error: 'Post not found'})
        };

        if(post.author.toString() !== userId){
            return res.status(403).json({error: "You don't have permission to perform this action"});
        }

        await Post.findByIdAndDelete(postId);

        if (user) {
            // Remove the post's ID from the user's posts array
            user.posts = user.posts.filter(postId => postId.toString() !== postId.toString());

            // Save the updated user document
            await user.save();
        }

        // await User.findByIdAndUpdate(userId, {$pull: {posts: postId}}, {new: true})

        res.status(200).json({message: 'Post delete successfully'})

    } catch (error) {
        console.error('Error in deletePost: ', error);
        res.status(500).json({message: error.message})
    }
    

}

const updatePost = async (req, res) => {
    try {
        const {postId} = req.params;
        const {userId} = req.user;

        const {title, content, tags} = req.body;

        const post = await Post.findById(postId);

        if(!post){
            return res.status(401).json({error: 'Post not found'})
        }

        if(post.author.toString() !== userId){
            return res.status(403).json({error: "You don't have permission to update this post"})
        };

        // Check if any changes were made
        const isTitleChanged = title && post.title !== title;
        const isContentChanged = content && post.content !== content;
        const isTagsChanged = tags && post.tags.toString() !== tags.toString();

        if (!isTitleChanged && !isContentChanged && !isTagsChanged) {
            // No changes were made
            return res.status(200).json({ message: 'No changes were made to the post.', post });
        }

        // Update the post with the new data
        post.title = title || post.title;
        post.content = content || post.content;
        post.tags = tags || post.tags;


        // Save the updated post
        await post.save();

        res.status(200).json({ message: 'Post updated successfully', post });
    } catch (error) {
        console.log('Error in updatePost: ', error);
        res.status(500).json('Internal server error')
    }
}

const getAllPost = async (req, res) => {
    try {
        const {userId} = req.user;

        const user = await User.findById(userId).populate('posts');

        if(!user){
            return res.status(401).json({error: 'User not found'})
        }

        const posts = user.posts;

        res.status(201).json(posts)
    } catch (error) {
        console.error('Error in getAllPost: ', error);
        res.status(500).json('Internal server error');
    }
}

const commentOnPost = async (req, res) => {
    try {
        const {userId} = req.user;
        const {postId} = req.params;
        
        const {text} = req.body;

        const user = await User.findById(userId);
        if(!user){
            return res.status(401).json({error: 'User not found'})
        };

        const post = await Post.findById(postId);
        if(!post){
            return res.status(401).json({error: 'Post is not found'})
        };
        
        const newComment = new Comment({
            text: text,
            user: userId,
            post: postId
        });

        await newComment.save();

        //Update the post to include the new comment in its comments array
        await Post.findByIdAndUpdate(postId, {
            $push: {comments: newComment._id}
        });

        await User.findByIdAndUpdate(userId, {
            $push: {comments: postId}
        });

        res.status(201).json({message: 'Comment added successfully', comment: newComment})
    } catch (error) {
        console.error('Error in commentOnPost: ', error);
        res.status(500).json({error: 'Internal server error'})
    }
}

const deleteCommentOnPost = async (req, res) => {
    try {
        const {userId} = req.user;
        const {postId, commentId} = req.params;

        // Find the Post
        const post = await Post.findById(postId);
        if(!post){
            return res.status(403).json({error: 'Post not found'})
        }

        // Find the comment on the post
        const comment = await Comment.findById(commentId);
        if(!comment){
            return res.status(403).json({error: 'Comment not found'})
        };

        if(comment.user.toString() !== userId){
            return res.status(403).json({error: 'You do not have permission to delete this comment'})
        };

        // if (!mongoose.Types.ObjectId.isValid(commentId)) {
        //     return res.status(400).json({ error: 'Invalid comment ID' });
        // }

        // Remove the comment from the database
        await Comment.findByIdAndDelete(comment);

        // Update the post to remove the comment from its comments array
        await User.findByIdAndUpdate(userId, {$pull: {comments: commentId}});

        // Update the user to remove the comment from its comment array
        await Post.findByIdAndUpdate(postId, {$pull: {comments: commentId}})
        
        res.status(200).json({message: 'Comment deleted succefully'})
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export {
    createPost,
    deletePost,
    updatePost,
    getAllPost,
    commentOnPost,
    deleteCommentOnPost
}