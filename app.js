const express = require("express")
const app = express()
const cors = require("cors")
const session = require("express-session")
const redis = require('redis')
const { assempleBirthdayGreeting } = require("./birthdaybash")

require('dotenv').config()

let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient()

app.use(cors())
app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000*60*8, secure: false },
    store: new RedisStore({client: redisClient})
}))
app.use("/api/song", express.static('Output'));

app.post("/api/post", async (req, res) => {
    console.log(req.sessionID)
    console.log(req.body)
    await assempleBirthdayGreeting(req.body.name, req.sessionID)
    res.send(req.sessionID + ".mp3")
})
app.get("/api", (req, res) => {
    res.send("test")
})
app.listen(3000, () => {
    console.log("Server is up!")
})