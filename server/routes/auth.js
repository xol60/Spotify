import express from 'express'
const router = express.Router()
import User, { authentication } from '../models/user.js'
import bcrypt from 'bcrypt'

router.post("/", async (req, res) => {
    const { error } = authentication(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });
    const user = await User.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send({ message: "invalid email or password!" });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
        return res.status(400).send({ message: "Invalid email or password!" });

    const token = user.generateAuthToken();
    res.status(200).send({ data: token });
});

export { router as authRouter }