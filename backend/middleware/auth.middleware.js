import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) {
        return res.status(401).json({ error: 'Access denied, No token provided'});
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        // console.log(req.user);
        next();
    } catch (error) {
        res.status(400).send('Invalid token .')
    }
};

export default verifyToken;