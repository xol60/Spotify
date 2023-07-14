import express from 'express'
const router = express.Router()
import User, { validate } from "../models/user.js";
import bcrypt from "bcrypt";


router.post("/create", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (user)
        return res
            .status(403)
            .send({ message: "User with given email already Exist!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    let newUser = await new User({
        ...req.body,
        password: hashPassword,
    }).save();

    newUser.password = undefined;
    newUser.__v = undefined;
    res
        .status(200)
        .send({ message: "Account created successfully" });
});


export { router as userRouter }