import User from "../models/user.model.js";

const followUser = async (req, res) => {
    try {
        const {userId} = req.user;
        const {followId} = req.params;

        const user = await User.findById(userId);

        if(!user){
            return res.status(401).json({error: 'User not found'})
        }

        const userToFollow = await User.findById(followId);

        if(!userToFollow){
            return res.status(401).json({error: 'User to follow are not found'})
        }

        // if(user.following.toString() === user.followers.toString()){
        //     return res.status(201).json({message: "You can't follow yourself"})
        // }

        if(user.following.includes(followId)){
            return res.status(401).json({message: 'You already follow this account'})
        }

        

        user.following.push(followId)
        await user.save();

        userToFollow.followers.push(userId);
        await userToFollow.save();

        res.status(200).json({message: 'User followed successfully'})
    } catch (error) {
        console.error('Error in followUser: ', error);
        res.status(500).json('Internal server error');
    }
};

const unfollowUser = async (req, res) => {
    try {
        const { userId } = req.user;
        const { followId } = req.params;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        const userToUnfollow = await User.findById(followId);

        if (!userToUnfollow) {
            return res.status(401).json({ error: 'User to unfollow not found' });
        }

        // if(user.following.includes(followId))
        // Remove the followId from the user's following array
        user.following = user.following.filter((id) => id.toString()!== followId);

        // Remove the userId from the userToUnfollow's followers array
        userToUnfollow.followers = userToUnfollow.followers.filter((id) => id.toString()!== userId);

        await user.save();
        await userToUnfollow.save();

        res.status(200).json({ message: 'User unfollowed successfully' });
    } catch (error) {
        console.error('Error in unfollowUser: ', error);
        res.status(500).json('Internal server error');
    }
};




export {
    followUser,
    unfollowUser
}