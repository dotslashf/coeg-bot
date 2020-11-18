const firebase = require('firebase/app');
const config = require('../config.json');

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

const rankCoeg = async () => {
  const snapshot = await fire.database().ref('coeg_counter/').once('value');
  return snapshot.val();
};

const fire = firebase.default.initializeApp(config.firebase_config);

module.exports = { fire, saveDataCoeg, getDataCoeg, rankCoeg };
