import mongoose from 'mongoose'
import Joi from 'joi'
const songSchema = new mongoose.Schema({
    name: { type: String, required: true },
    artist: { type: String, required: true },
    song: { type: String, required: true, default: '' },
    img: { type: String, required: true, default: '' },
    duration: { type: String, required: true },
});

export const validate = (song) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        song: Joi.string().required(),
        duration: Joi.number().required(),
    });
    return schema.validate(song);
};

const Song = mongoose.model("song", songSchema);

export default Song