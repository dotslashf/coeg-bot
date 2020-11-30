const videoshow = require('videoshow');
const config = require('../../config.js');

class VideoGenerator {
  constructor(type, image) {
    this.image = [image];
    this.audio = config.IMG_TO_VIDEO_SETTING[type].audio;
    this.setting = config.IMG_TO_VIDEO_SETTING[type].setting;
  }

  async generateVideo(message) {
    videoshow(this.image, this.setting)
      .audio(this.audio)
      .save('./src/video/output.mp4')
      .on('start', command => {
        console.log('Command: ', command);
      })
      .on('error', (err, stdout, stderr) => {
        console.error('Error:', err);
        console.error('ffmpeg stderr:', stderr);
      })
      .on('end', output => {
        console.error('Uploading video:', output);
        message.reply({ files: ['./video/output.mp4'] });
      });
  }
}

module.exports = VideoGenerator;
