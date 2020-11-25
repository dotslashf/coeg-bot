const fs = require('fs');
const nodeFetch = require('node-fetch');
const Jimp = require('jimp');

const sleep = ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

const downloadImage = async (url, filepath) => {
  // @ts-ignore
  const response = await nodeFetch(url);
  const buffer = await response.buffer();
  fs.writeFile(filepath, buffer, () => {
    console.log('Success downloading image! 🖼️');
  });
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

const filterBlackWhite = filename => {
  Jimp.read(filename, function (err, image) {
    if (err) throw err;
    image.greyscale().write('./img-output/imgAudio.png');
  });
};

const random = number => {
  return Math.floor(Math.random() * number);
};

const maskImage = async imagePath => {
  const image = await Jimp.read(imagePath);

  image.circle();
  image.write('./img-output/avatar.png');
};

const capitalize = string => {
  return string[0].toUpperCase() + string.slice(1);
};

module.exports = {
  sleep,
  downloadImage,
  countCoeg,
  filterBlackWhite,
  random,
  maskImage,
  capitalize,
};
