const firebase = require('firebase/app');
const config = require('../config.js');

require('firebase/database');

const saveDataCoeg = (userId, username, counter) => {
  fire
    .database()
    .ref('coeg_counter/' + userId)
    .set({
      username: username,
      counter: counter,
    });
};

const getDataCoeg = async userId => {
  const snapshot = await fire
    .database()
    .ref('coeg_counter/' + userId)
    .once('value');
  var counter = snapshot.val().counter;
  return counter;
};

const rankCoeg = async sender_id => {
  const snapshot = await fire.database().ref('coeg_counter/').once('value');

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
    .indexOf(sender_id);

  return pos + 1;
};

const fire = firebase.default.initializeApp(config.FIREBASE_CONFIG);

module.exports = { fire, saveDataCoeg, getDataCoeg, rankCoeg };
