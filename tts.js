const textToSpeech = require('@google-cloud/text-to-speech');
require('dotenv').config()

const fs = require('fs');
const util = require('util');

const test = {
  "type": "service_account",
  "project_id": "stone-passage-255117",
  "private_key_id": "5889ef4b08ef605ec25d89073c722562eb4f80ab",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCaICkw5a6J+Wqt\n2/9+OctSuhQsb1F1toHVn/Zi7GM7Ib6ylFuuGSsqE/E2Xb+NFsE985eEsWqk4h/+\nWttkT1q2OvFfTdIhDANNYzkGeBXldzr70kvL+abCgpBJr15sn57OT08rkXYTBLGl\nryX6cpL+jt12HtbtC4NFF5HX/j1KTx+wIbmRDYAB3Y8WGsnsqS8IXiTJduqw9W+j\nydQtCH9+oSM48NQtRRw3jHlnU5XJvnkROmt7t/YZR9JxqnyuvDE/gGZgMzCrOLPh\nE6s6lozC4/6zQu6qcvBLO7p+3VbaXXykA9ul6ZnjCiYPz7cwg/O51qRC3PgP9dFE\nChyqXSSpAgMBAAECggEAOVZvnIZF+YR1gHqQwSfFEWCycplzJ6SfBpc89S5V+ECk\njhENTmaEnWHP4dbclSN6/o4pty69qtuI5XptlhLDf3nMJBVyb+LlM5wPMe3oz3Yc\n1mQ02Ixm0oP6I79/FFAJp1zv6hhyYb7kS+wt589KCjOiBfiRIpye2ExdcIpfyM20\nlKTPypjg/x/5PwIUTcT3BJAw+AX+FelY5gOlwL3UdvJySJSJd2SmCDplFvuw76+H\nGNtot43nPD7Tx9BX9Hs4cKNuQVX96Rv6si6DVODOgvwlz5CyS13cgQmIZsYChzL2\nqO8dK13KJ3iQDCcND4hrWaMTZ9rg0SL75nMYFMTDtQKBgQDWc/1V0ptwkrrp9Xiy\nBPYxcxQVEHMfWxLGYeCTsUa/WukjKyieDNFfyZ+xQySlGc2cXxFdjAH58vlPWiCa\nKlFhbkWbRYrdi0IBhA+glTrSx3g7yusnOE/QEjQJWwiaZCSNDLrsJ8/sNAImDO/E\n6qa/lbRN9IaBJl41fbz8gnGv4wKBgQC3/CwSL7D4TXkDkzHt6CB54Fn5SuGFbXlr\n/y2T5CQ6ScLYIfRU9JesSs76wf1m8dAYDFxBvmAeS0QV1+r9tstWw7exFm8WM/I/\nLUfbBkArotYQtyfZIIz87vPKNfBr5K1RtC7nrPDu3WbyJ3y4Jj5ceJILxHL0UvYr\nwZubfXmnAwKBgQDTMM7fYdSp/BYOqSr/RVuePxIb3GNDEdFfhKxBRmfBsqm9dJc/\nbqgSiOC3FMRVwx91SzoywdqAaAOVXdCVge863/m0e7vRiX6rN36cSdnwEXgaii8i\nJJaU9hhAzmGeidhk/5BlWJ+uoVksV7kYV213Ztp1msWLElncm8MteNi0uQKBgGW/\n3E+ieGiZz9ceTHqZ6Xv9i0THGLnFtWT4lqg3f6GMsWj+PjXNnyP1q0oahp2sFb12\n+H6TXmziiyDZbGgr84BkdO5GzeClkc9Gp3qFlm+Len98C1mVGuO28rRd6DyDFycc\nUuRlTEmNwCUjmWHuJIbXV02Ss1BToTjJtdjkJ6cpAoGAAnIYpLm2ACT0W7GZAk0I\ndi0v3Kcrn6vDpXihJVKNHUc+y2yCd3cDhb/JLsf4z75q+wT+QeEuq2iaurCL8Jms\ngHMIgWyz/2KGu01wcKWD4rWy8EcjQHxiNIcNVp9emAKunbfcdznbLsJ9WOfN7RH8\nDPxqOR46JE8mg6aVcq+N1PA=\n-----END PRIVATE KEY-----\n",
  "client_email": "ratsjerma@stone-passage-255117.iam.gserviceaccount.com",
  "client_id": "100758566307166260818",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/ratsjerma%40stone-passage-255117.iam.gserviceaccount.com"
}
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