const { getNameAudio } = require("./tts.js")
const { create, cleanupTempFiles } = require("./ffmpeghandler")
const FlakeId = require('flake-idgen');
const flakeIdGen = new FlakeId();
const intformat = require('biguint-format')
const fs = require("fs");


async function assempleBirthdayGreeting(name) {
    const id = intformat(flakeIdGen.next(), "dec")
    await getNameAudio(name, id).then(async () => {
        console.log("yahoo")
        await create(name, id).then(() => {
            console.log("aiwdhiuawdhiuawd")
        });
    })
}
assempleBirthdayGreeting("Fred")
assempleBirthdayGreeting("Soren")
assempleBirthdayGreeting("Peter")
assempleBirthdayGreeting("Natasja")
assempleBirthdayGreeting("Billy")
assempleBirthdayGreeting("Hughie")
assempleBirthdayGreeting("Frenchie")
assempleBirthdayGreeting("Fred")
assempleBirthdayGreeting("Soren")
assempleBirthdayGreeting("Peter")
assempleBirthdayGreeting("Natasja")
assempleBirthdayGreeting("Billy")
assempleBirthdayGreeting("Hughie")
assempleBirthdayGreeting("Frenchie")
assempleBirthdayGreeting("Fred")
assempleBirthdayGreeting("Soren")
assempleBirthdayGreeting("Peter")
assempleBirthdayGreeting("Natasja")
assempleBirthdayGreeting("Billy")
assempleBirthdayGreeting("Hughie")
assempleBirthdayGreeting("Frenchie")
assempleBirthdayGreeting("Fred")
assempleBirthdayGreeting("Soren")
assempleBirthdayGreeting("Peter")
assempleBirthdayGreeting("Natasja")
assempleBirthdayGreeting("Billy")
assempleBirthdayGreeting("Hughie")
assempleBirthdayGreeting("Frenchie")
