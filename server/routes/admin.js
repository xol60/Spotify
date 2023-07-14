import express from 'express'
const router = express.Router()
import User, { validate } from "../models/user.js";
import { isAdmin, authentication } from '../utils/auth.js';


router.get("/get", isAdmin, async (req, res) => {
    const users = await User.find({ "isAdmin": false }).select("-password -__v");
    res.status(200).send({ data: users });
});
router.get("/:id", isAdmin, async (req, res) => {
    const user = await User.findById(req.params.id).select("-password -__v -isAdmin");
    res.status(200).send({ data: user });
});

router.put("/:id", isAdmin, async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
    ).select("-password -__v");
    res.status(200).send({ data: user, message: "Profile updated successfully" });
});

export { router as adminRouter }