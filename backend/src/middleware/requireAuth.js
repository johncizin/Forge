//
import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1]; // CoPilot gave me this?

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const playload = jwt.verify(token, "secret"); //TODO: move secret to env. But for now testing to get curl to work

        req.user = { id: playload.userId }; 

        next(); 
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}