var ffprobe = require('ffprobe'), ffprobeStatic = require('ffprobe-static');

// Import other required libraries
const fs = require('fs');
const util = require('util');
const ffmpeg = "./ffmpeg/ffmpeg"
const ffpropePath = "./ffmpeg/ffprobe"
const exec = require('child-process-promise').execFile



const input = './TempFiles/input.mp3'
const silenceoutput = './TempFiles/silencedFile.mp3'
const output = "./TempFiles/done.mp3"
// Creates a client
async function create(id, sessionID, name) {
    return new Promise((resolve, reject) => {
        silenceAudio(id).then(() => {
            ffprobe(("./TempFiles/s" + id + ".mp3"), { path: ffpropePath }, function (err, info) {
                if (err) return console.log(err);
                normalizeTempo(info, id).then(() => {
                    combineAudioTracks(id, sessionID, name).then(() => {
                        cleanupTempFiles(id).then(() => {
                            resolve()
                        })
                    })
                })
            })
        })
    })

    // await cleanupTempFiles()

}

async function silenceAudio(id) {
    const silenceInfo = "silenceremove=1:0:-50dB, volume=3.0"
    return exec(ffmpeg, ['-i', ("./TempFiles/" + id + ".mp3"), '-af', silenceInfo, ("./TempFiles/s" + id + ".mp3"), "-y"])
}


async function normalizeTempo(info, id) {
    const duration = parseFloat(info.streams[0].duration)
    const multiplier = duration / 0.60
    const str = "atempo=" + multiplier
    return exec(ffmpeg, ['-i', ("./TempFiles/s" + id + ".mp3"), '-filter_complex', str, ("./TempFiles/d" + id + ".mp3"), "-y"])
}


async function combineAudioTracks(id, sessionID, name) {
    const audioDelayStr = "[1]adelay=8243[file_2];[2]adelay=12347[file_3];[3]adelay=28752[file_4];[4]adelay=32860[file_5];[5]adelay=36980[file_6];[6]adelay=53363[file_7];[7]adelay=57514[file_8];[8]adelay=61577[file_9]; \
            [0][file_2][file_3][file_4][file_5][file_6][file_7][file_8][file_9]amix=9:dropout_transition=1000, volume=10.0"

    return exec(ffmpeg,
        ['-i', "basesong.mp3",
            '-i', ("./TempFiles/d" + id + ".mp3"),
            '-i', ("./TempFiles/d" + id + ".mp3"),
            '-i', ("./TempFiles/d" + id + ".mp3"),
            '-i', ("./TempFiles/d" + id + ".mp3"),
            '-i', ("./TempFiles/d" + id + ".mp3"),
            '-i', ("./TempFiles/d" + id + ".mp3"),
            '-i', ("./TempFiles/d" + id + ".mp3"),
            '-i', ("./TempFiles/d" + id + ".mp3"),
            '-filter_complex', audioDelayStr, ("./Output/" + name + sessionID + ".mp3"), "-y"])
}
async function cleanupTempFiles(id) {
    const files = ["./TempFiles/" + id + ".mp3",
    "./TempFiles/d" + id + ".mp3",
    "./TempFiles/s" + id + ".mp3"];
    var i = files.length;
    files.forEach(function (filepath) {
        fs.unlink(filepath, function (err) {
            i--;
            if (err) {
                return;
            } else if (i <= 0) {
            }
        });
    });


}

module.exports.create = create
module.exports.cleanupTempFiles = cleanupTempFiles