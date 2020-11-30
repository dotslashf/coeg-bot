const { promises: fs } = require('fs');
const fileStream = require('fs');
const Jimp = require('jimp');
const { default: Axios } = require('axios');

const sleep = ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

const downloadImage = async (url, filepath) => {
  const writer = fileStream.createWriteStream(filepath);

  const response = await Axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
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

const getUserIdFromMention = mention => {
  if (!mention) return;

  if (mention.startsWith('<@') && mention.endsWith('>')) {
    mention = mention.slice(2, -1);

    if (mention.startsWith('!')) {
      mention = mention.slice(1);
    }

    return mention;
  }
};

const getCommandsFiles = async (path = './src/commands/') => {
  const entries = await fs.readdir(path, { withFileTypes: true });

  const files = entries
    .filter(file => !file.isDirectory())
    .map(file => ({ ...file, path: path + file.name }));

  const folders = entries.filter(folder => folder.isDirectory());

  for (const folder of folders)
    files.push(...(await getCommandsFiles(`${path}${folder.name}/`)));

  return files;
};

module.exports = {
  sleep,
  downloadImage,
  countCoeg,
  filterBlackWhite,
  random,
  maskImage,
  capitalize,
  getUserIdFromMention,
  getCommandsFiles,
};
