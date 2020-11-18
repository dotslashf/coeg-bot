const videoshow = require('videoshow');

class VideoGenerator {
  constructor(audio, image) {
    this.image = [image];
    this.audio = audio;
    this.setting = {
      fps: 24,
      loop: 10,
      videoBitrate: 1024,
      transition: false,
      videoCodec: 'libx264',
      size: '640x?',
      audioBitrate: '128k',
      audioChannels: 2,
      format: 'mp4',
      pixelFormat: 'yuv420p',
      fade: false,
    };
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
