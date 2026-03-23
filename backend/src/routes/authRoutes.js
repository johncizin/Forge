import express from "express";

//--Services--
import { userService } from "../container.js";
import { authService } from "../container.js";


const router = express.Router();

router.post("/register", async (req, res) => {
   const user = await userService.register(req.body);
   res.json(user);
});

//Application
router.post("/login", async (req, res) => {
    const reseult = await authService.login(req.body); //matters
    if (!reseult) {
        return res.status(401).json({ error: 'Invalid credentials' });
    } else {
        console.log("Login successful for user:", reseult.user.email);
    }
    res.json(reseult);
});

export default router;