const videoshow = require('videoshow');
const config = require('./config.json');

class VideoGenerator {
  constructor(type, image) {
    this.image = [image];
    this.audio = config.imgToVideoSetting[type].audio;
    this.setting = config.imgToVideoSetting[type].setting;
  }

  async generateVideo(message) {
    videoshow(this.image, this.setting)
      .audio(this.audio)
      .save('./video/output.mp4')
      .on('start', command => {
        console.log('Generating video');
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
