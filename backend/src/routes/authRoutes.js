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
    const reseult = await authService.login(req.body.email, req.body.password); //matters
    res.json(reseult);
});

export default router;