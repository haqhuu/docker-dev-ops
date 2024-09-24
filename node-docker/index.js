const express = require('express')

const app = express()

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    console.log(`Server home`)
    res.send(`<h2>Hi </h2>`)
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
