import dotenv from 'dotenv'
import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import connection from './db.js'
import * as router from './routes/index.js'
dotenv.config()
const app = express()

express.application.prefix = express.Router.prefix = function (path, configure) {
    var router = express.Router();
    this.use(path, router);
    configure(router);
    return router;
};

connection();
app.use(cors());
app.use(express.json());
app.use('/v1/auth', router.authRouter)
app.use('/v1/user', router.userRouter)
app.use('/v1/admin', router.adminRouter)
app.use('/v1/song', router.songRouter)
app.use('/v1/playlist', router.playlistRouter)

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));