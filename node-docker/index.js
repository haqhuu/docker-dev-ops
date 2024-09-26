
const express = require('express')
const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_IP,
    MONGO_PORT
} = require("./config/config")

const postRouter = require("./routes/postRoutes")
const userRouter = require("./routes/userRoutes")

const app = express()

const CONNECTION_STRING =
    `mongodb://${process.env.MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
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
app.use(express.json())


app.get('/', (req, res) => {

    res.send(`<h2 style="color: red;">fhdhfdh </h2>`)
})

//localhost:3000/api/v1/post/
app.use("/api/v1/posts", postRouter)
app.use("/api/v1/users", userRouter)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
