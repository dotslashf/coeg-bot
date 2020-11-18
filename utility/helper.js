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

const countCoeg = texts => {
  var result = 0;
  const n = Math.ceil(Math.random() * 3);
  texts.map(text => {
    if (text === 'coeg' || text === 'Coeg') {
      result += 1;
    }
  });
  return result <= n ? result : n;
};

module.exports = { sleep, downloadImage, countCoeg };
