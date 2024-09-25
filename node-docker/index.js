
const express = require('express')
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require("./config/config")
const app = express()

const CONNECTION_STRING = `mongodb://${process.env.MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

const mongoose = require('mongoose')

mongoose.connect(CONNECTION_STRING).then(
    () => console.log("connected to server!")
).catch(e => console.log(e))


const port = process.env.PORT || 3000;


app.get('/', (req, res) => {

    res.send(`<h2>hhhhhhhhh </h2>`)
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
