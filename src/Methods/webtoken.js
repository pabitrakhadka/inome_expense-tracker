import jwt from "jsonwebtoken";

export const genereteToken = (payload) => {
    const secretKey = process.env.JWT_SECRET;
    const option = {
        expiresIn: '1d',
    }
    const token = jwt.sign(payload, secretKey, option);
    return token;
}

export const verefyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No Token Provided.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded token data (e.g., user info) to the request
        next();
    } catch (err) {
        return res.status(400).json({ message: 'Invalid Token.' });
    }
}

