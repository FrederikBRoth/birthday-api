const textToSpeech = require('@google-cloud/text-to-speech');
require('dotenv').config()

const fs = require('fs');
const util = require('util');


const config = {
  projectId: "stone-passage-255117",
  keyFilename: test
}
const client = new textToSpeech.TextToSpeechClient(config)
async function getNameAudio(name, id) {
  const text = name + "?";
  // Construct the request
  const request = {
    input: { text: text },
    // Select the language and SSML voice gender (optional)
    voice: { languageCode: 'en-US', ssmlGender: 'MALE', name: 'en-US-Standard-B' },
    // select the type of audio encoding
    audioConfig: { audioEncoding: 'MP3' },
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile("./TempFiles/" + id + ".mp3", response.audioContent, 'binary');
  console.log("gotten file!")
}

module.exports.getNameAudio = getNameAudio