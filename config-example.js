const config = {
  BOT_TOKEN: {
    dev: '',
    prod: '',
  },
  GENIUS_TOKEN: {
    ACCESS_TOKEN: '',
    CLIENT_ID: '',
    CLIENT_SECRET: '',
  },
  IMAGE_FILE: {
    mock: {
      original: './img/mockthistweet.png',
      output: './img-output/mockthistweet.png',
    },
    tubir: {
      original: './img/tubirfess.png',
      output: './img-output/tubirfess.png',
    },
    fwb: {
      original: './img/fwbase.png',
      output: './img-output/fwbase.png',
    },
    diss: {
      original: './img/areajulid.png',
      output: './img-output/areajulid.png',
    },
    rank: {
      original: './img/template-rank.png',
      output: './img-output/template-rank.png',
    },
  },
  PREFIX: ':V',
  IMG_TO_VIDEO_SETTING: {
    ketawa: {
      audio: './audio/ketawa.mp3',
      setting: {
        fps: 24,
        loop: 6,
        videoBitrate: 1024,
        transition: false,
        videoCodec: 'libx264',
        size: '640x?',
        audioBitrate: '128k',
        audioChannels: 2,
        format: 'mp4',
        pixelFormat: 'yuv420p',
        fade: false,
      },
    },
    badut: {
      audio: './audio/badut.mp3',
      setting: {
        fps: 24,
        loop: 19,
        videoBitrate: 1024,
        transition: false,
        videoCodec: 'libx264',
        size: '640x?',
        audioBitrate: '128k',
        audioChannels: 2,
        format: 'mp4',
        pixelFormat: 'yuv420p',
        fade: false,
      },
    },
    sad: {
      audio: './audio/unraveldang.mp3',
      setting: {
        fps: 24,
        loop: 30,
        videoBitrate: 1024,
        transition: false,
        videoCodec: 'libx264',
        size: '640x?',
        audioBitrate: '128k',
        audioChannels: 2,
        format: 'mp4',
        pixelFormat: 'yuv420p',
        fade: false,
      },
    },
    sedih: {
      audio: './audio/unravelori.mp3',
      setting: {
        fps: 24,
        loop: 30,
        videoBitrate: 1024,
        transition: false,
        videoCodec: 'libx264',
        size: '640x?',
        audioBitrate: '128k',
        audioChannels: 2,
        format: 'mp4',
        pixelFormat: 'yuv420p',
        fade: false,
      },
    },
  },
  FIREBASE_CONFIG: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: '',
  },
  MODE: 'prod', // prod || dev
};

module.exports = config;
