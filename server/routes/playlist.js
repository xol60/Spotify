import express from 'express'
const router = express.Router()
import PlayList, { validate, update, editPlaylist } from '../models/playlist.js'
import Song from '../models/song.js';
import User from '../models/user.js';
import { authentication, isAdmin } from '../utils/auth.js';
import Joi from 'joi'


router.post("/public-playlist", isAdmin, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });
    const playList = await PlayList({ ...req.body, public: true }).save();
    res.status(201).send({ data: playList });
});


router.put("/public/edit/:id", isAdmin, async (req, res) => {

    const { error } = update(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const playlist = await PlayList.findById(req.params.id);
    if (!playlist) return res.status(404).send({ message: "Playlist not found" });

    if (!playlist.public)
        return res.status(403).send({ message: "Adnub don't have access to edit!" });

    playlist.name = req.body.name;
    playlist.desc = req.body.desc;
    playlist.img = req.body.img;
    await playlist.save();

    res.status(200).send({ message: "Updated successfully" });
});


router.put("/public/add-song", isAdmin, async (req, res) => {

    const { error } = editPlaylist(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const playlist = await PlayList.findById(req.body.playlistId);
    if (!playlist.public)
        return res.status(403).send({ message: "User don't have access to add!" });

    if (playlist.songs.indexOf(req.body.songId) === -1) {
        playlist.songs.push(req.body.songId);
    }
    await playlist.save();
    res.status(200).send({ data: playlist, message: "Added to playlist" });
});


router.put("/public/remove-song", isAdmin, async (req, res) => {

    const { error } = editPlaylist(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const playlist = await PlayList.findById(req.body.playlistId);
    if (!playlist.public)
        return res
            .status(403)
            .send({ message: "User don't have access to Remove!" });

    const index = playlist.songs.indexOf(req.body.songId);
    playlist.songs.splice(index, 1);
    await playlist.save();
    res.status(200).send({ data: playlist, message: "Removed from playlist" });
});


export { router as playlistRouter }