const { getNameAudio } = require("./tts.js")
const { create, cleanupTempFiles } = require("./ffmpeghandler")
const FlakeId = require('flake-idgen');
const flakeIdGen = new FlakeId();
const intformat = require('biguint-format')
const fs = require("fs");


async function assempleBirthdayGreeting(name, sessionID) {
    const id = intformat(flakeIdGen.next(), "dec")
    await getNameAudio(name, id).then(async () => {
        console.log("yahoo")
        await create(id, sessionID, name).then(() => {
            console.log("aiwdhiuawdhiuawd")
        });
    })
}
module.exports.assempleBirthdayGreeting = assempleBirthdayGreeting