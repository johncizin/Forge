//
import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1]; // CoPilot gave me this?

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        console.log("TOKEN RECEIVED:", token);
        const playload = jwt.verify(token, process.env.JWT_SECRET); //TODO: move secret to env. But for now testing to get curl to work **Done

        req.user = { id: playload.userId }; 

        next(); 
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}