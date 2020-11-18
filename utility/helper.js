const fs = require('fs');
const nodeFetch = require('node-fetch');

const sleep = ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

const downloadImage = async url => {
  // @ts-ignore
  const response = await nodeFetch(url);
  const buffer = await response.buffer();
  fs.writeFile(`./img/imgAudio.png`, buffer, () =>
    console.log('Downloading image! 🖼️')
  );
};

module.exports = { sleep, downloadImage };
