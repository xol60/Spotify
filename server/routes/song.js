import express from 'express'
const router = express.Router()
import User from '../models/user.js'
import Song, { validate } from '../models/song.js'
import { authentication, isAdmin } from '../utils/auth.js'

router.post("/admin", isAdmin, async (req, res) => {
    const { error } = validate(req.body);
    if (error) res.status(400).send({ message: error.details[0].message });

    const song = await Song(req.body).save();
    res.status(200).send({ data: song, message: "Song created successfully" });
});


router.get("/admin/list", isAdmin, async (req, res) => {
    const songs = await Song.find();
    res.status(200).send({ data: songs });
});



router.put("/user/like/:id", authentication, async (req, res) => {
    let resMessage = "";
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(400).send({ message: "song does not exist" });

    const user = await User.findById(req.user._id);
    const index = user.likedSongs.indexOf(song._id);
    if (index === -1) {
        user.likedSongs.push(song._id);
        resMessage = "Added to your liked songs";
    } else {
        user.likedSongs.splice(index, 1);
        resMessage = "Removed from your liked songs";
    }

    await user.save();
    res.status(200).send({ message: resMessage });
});


router.get("/user/like", authentication, async (req, res) => {
    const user = await User.findById(req.user._id);
    const songs = await Song.find({ _id: user.likedSongs });
    res.status(200).send({ data: songs });
});

export { router as songRouter }