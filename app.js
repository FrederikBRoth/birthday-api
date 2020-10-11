const express = require("express")
const app = express()
const cors = require("cors")
const session = require("express-session")
const { assempleBirthdayGreeting } = require("./birthdaybash")
require('dotenv').config()


app.use(cors())
app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000, secure: false },
}))
app.use("/api/song", express.static('Output'));

app.post("/api", async (req, res) => {
    console.log(req.sessionID)
    console.log(req.body)
    await assempleBirthdayGreeting(req.body.name, req.sessionID)
    res.send(req.sessionID + ".mp3")
})

app.listen(3000, () => {
    console.log("Server is up!")
})