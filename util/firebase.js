const firebase = require('firebase/app');
const config = require('../config.js');

require('firebase/database');

const saveDataCoeg = (guildId, userId, username, counter) => {
  fire
    .database()
    .ref(guildId + '/coeg_counter/' + userId)
    .set({
      username: username,
      counter: counter,
    });
};

const getDataCoeg = async (guildId, userId) => {
  const snapshot = await fire
    .database()
    .ref(guildId + '/coeg_counter/' + userId)
    .once('value');
  var counter = snapshot.val().counter;
  return counter;
};

const rankCoeg = async (guildId, senderId) => {
  const snapshot = await fire
    .database()
    .ref(guildId + '/coeg_counter/')
    .once('value');

  const coegTotal = snapshot.val();

  let results = [];
  Promise.all(
    Object.keys(coegTotal).map(key => {
      results.push({ key: key, value: coegTotal[key].counter });
    })
  );
  let resultsSorted = results.sort((a, b) => {
    return b.value - a.value;
  });

  var pos = resultsSorted
    .map(x => {
      return x.key;
    })
    .indexOf(senderId);

  return pos + 1;
};

const saveScoreTebak = async (guildId, userId, username, score) => {
  fire
    .database()
    .ref(guildId + '/score_tebak/' + userId)
    .set({
      username,
      score,
    });
};

const getScoreTebak = async (guildId, userId) => {
  const snapshot = await fire
    .database()
    .ref(guildId + '/score_tebak/' + userId)
    .once('value');
  return snapshot.val() ? snapshot.val().score : 0;
};

const rankScoreTebak = async (guildId, userId) => {
  const snapshot = await fire
    .database()
    .ref(guildId + '/score_tebak/')
    .once('value');

  const scoreTotal = snapshot.val();

  let results = [];
  Promise.all(
    Object.keys(scoreTotal).map(key => {
      results.push({
        key: key,
        value: {
          score: scoreTotal[key].score,
          username: scoreTotal[key].username,
        },
      });
    })
  );

  let resultsSorted = results.sort((a, b) => {
    return b.value.score - a.value.score;
  });

  var pos = resultsSorted
    .map(x => {
      return x.key;
    })
    .indexOf(userId);

  pos += 1;

  return { pos, resultsSorted };
};

const fire = firebase.default.initializeApp(config.FIREBASE_CONFIG);

module.exports = {
  saveDataCoeg,
  getDataCoeg,
  rankCoeg,
  saveScoreTebak,
  getScoreTebak,
  rankScoreTebak,
};
