import jwt from 'jsonwebtoken';

const generateToken = (user) => {
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })
    return token;
};

export default generateToken;