import User from "../models/user.model.js";
import generateToken from "../utils/auth.utils.js";
import bcrypt from 'bcryptjs';

const registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;
    
        const existingUser = await User.findOne({$or: [{username}, {email}]}).select('-password');
    
        if(existingUser){
            return res.status(400).json({error: 'A user with that username or email already exists'})
        };
    
        const newUser = new User({
            username, 
            email,  
            password
        });

        const token = generateToken(newUser);
        res.cookie('authToken', token, {httpOnly: true})
        
        await newUser.save();

        res.status(201).json({newUser, token});
    } catch (error) {
        console.log('Error in registerUser: ', error);
        res.status(500).json('Internal server error')
    }
    
};

const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;
    
        const user = await User.findOne({username})
    
        if(!user){
            return res.status(400).json({error: 'User not found'})
        };
    
        const isMatchPassword = await bcrypt.compare(password, user.password);
    
        if(!isMatchPassword){
            return res.status(400).json({error: "password don't match"})
        };
    
        const token = generateToken(user);
        res.cookie('authToken', token, {httpOnly: true});

        console.log(user);
    
        res.status(201).json({message: 'Login successfully', user, token})
    } catch (error) {
        console.log('Error in loginUser: ', error);
        res.status(500).json('Internal server error')
    }
}

const logoutUser = async (req, res) => {
    try {
        res.cookie('authToken', '', {expires: new Date(0)});
        res.status(201).json({message: 'Logged out successfully'})
    } catch (error) {
        console.error('Error in logoutUser: ', error);
        res.status(500).json('Internal server error')
    }
};

const getUser = async (req, res) => {
    try {
        const {userId} = req.user;
        // console.log(userId);

        const user = await User.findById(userId).select('-password');

        if(!user){
            return res.status(404).json({error: 'User not found'})
        };

        res.status(200).json(user)
    } catch (error) {
        console.log('Error in getUser: ', error);
        res.status(500).json('Internal server error')
    }
}

export {
    registerUser,
    loginUser,
    logoutUser,
    getUser
}