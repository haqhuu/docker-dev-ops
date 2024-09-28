
const express = require('express')
const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_IP,
    MONGO_PORT,
    REDIS_URL,
    REDIS_PORT,
    SESSION_SECRET
} = require("./config/config")
const cors = require("cors")
const session = require('express-session')
const redis = require("redis")
let RedisStore = require("connect-redis")(session)

let redisClient = redis.createClient({
    legacyMode: true,
    url: `redis://${REDIS_URL}:${REDIS_PORT}`
})

const postRouter = require("./routes/postRoutes")
const userRouter = require("./routes/userRoutes")

const app = express()

const CONNECTION_STRING =
    `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
const mongoose = require('mongoose')

const connectWithRetry = () => {
    mongoose.connect(CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(
        () => console.log("connected to server!")
    ).catch(e => {
        console.log(e)
        setTimeout(connectWithRetry, 5000)
    })
}

const port = process.env.PORT || 3000;

connectWithRetry()

redisClient.connect()

app.enable("trust proxy")
app.use(cors({}))
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: SESSION_SECRET,
        cookie: {
            secure: false,
            resave: false,
            saveUninitialized: false,
            httpOnly: true,
            maxAge: 30000
        }
    })
)

app.use(express.json())


app.get('/api', (req, res) => {

    res.send(`<h2 style="color: red;">hasdyq </h2>`)
})

//localhost:3000/api/v1/post/
app.use("/api/v1/posts", postRouter)
app.use("/api/v1/users", userRouter)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
