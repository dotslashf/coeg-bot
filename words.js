const GeneratorTebakKata = require('./generator/GeneratorTebakKata');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const word = new GeneratorTebakKata();

var waitForUserInput = function () {
  readline.question('Answer?: ', function (answer) {
    if (answer == 'exit') {
      readline.close();
    } else {
      word.answer(answer);
      console.log(
        `Kata tersembunyi: ${word.hiddenWord.join('')} | score: ${word.score}`
      );
      waitForUserInput();
      if (word.hiddenWord.join('') == word.word) {
        readline.close();
      }
    }
  });
};

console.log(
  `Kata tersembunyi: ${word.hiddenWord.join('')} | score: ${word.score}`
);
waitForUserInput();
// console.log(
//   `Kata tersembunyi: ${word.hiddenWord.join('')}, ${word.generateNChar()}`
// );
// console.log(`Kata asli: ${word.word}, ${word.word.length}`);
// console.log(word.scoreModifier);
