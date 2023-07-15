import mongoose from 'mongoose'
import Joi from 'joi'

const ObjectId = mongoose.Schema.Types.ObjectId;

const playListSchema = new mongoose.Schema({
    name: { type: String, required: true },
    user: { type: ObjectId, ref: "user", default: '' },
    desc: { type: String, default: "" },
    songs: { type: Array, default: [] },
    img: { type: String, default: "" },
    public: { type: Boolean, default: false }
});

export const validate = (playList) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        songs: Joi.array().items(Joi.string()),
    });
    return schema.validate(playList);
};
export const update = (playList) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        desc: Joi.string().allow(""),
        img: Joi.string().allow(""),
    });
    return schema.validate(playList);
};
export const editPlaylist = (playList) => {
    const schema = Joi.object({
        playlistId: Joi.string().required(),
        songId: Joi.string().required(),
    });
    return schema.validate(playList);
};
const PlayList = mongoose.model("playList", playListSchema);
export default PlayList