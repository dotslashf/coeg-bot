const listWords = require('../listWords');
const { random } = require('../util/helper');

module.exports = class GeneratorTebakKata {
  constructor() {
    this.word = listWords[random(listWords.length)];
    this.hiddenWord = [];
    this.hiddenChar = [];
    this.generateHiddenWord();
    this.getHiddenChar();
    this.score = 100;
    this.scoreModifier = Math.floor(
      100 / (this.word.length - this.generateNChar())
    );
    this.hiddenCharOnly = [];
  }

  generateNChar() {
    const n = this.word.length;

    if (n <= 5) {
      return 2;
    } else if (n <= 6) {
      return 3;
    } else if (n <= 9) {
      return 4;
    } else if (n <= 10) {
      return 5;
    } else {
      return 6;
    }
  }

  generateHiddenWord() {
    const nChar = this.generateNChar() - 2;
    let hiddenWord = this.word.split('');

    for (let i = 0; i < hiddenWord.length; i++) {
      if (i != 0 && i != hiddenWord.length - 1) {
        hiddenWord[i] = '*';
      }
    }

    for (let i = 0; i < nChar; i++) {
      let n = random(hiddenWord.length);
      if (n == 0 || n == hiddenWord.length - 1) {
        n = random(hiddenWord.length);
      }
      hiddenWord[n] = this.word[n];
    }

    this.hiddenWord = hiddenWord;
  }

  getHiddenChar() {
    let chars = [];
    this.hiddenWord.forEach((element, index) => {
      if (element == '*') {
        chars.push({ i: index, char: this.word[index] });
      }
    });
    this.hiddenChar = chars;
  }

  /**
   * @param {string} char
   */
  answer(char) {
    this.hiddenChar.forEach(element => {
      if (element.char == char.toLowerCase()) {
        this.hiddenWord[element.i] = char;
      }
    });

    const hiddenChar = this.hiddenChar.map(char => {
      return char.char;
    });

    this.hiddenCharOnly = hiddenChar;

    if (!hiddenChar.includes(char)) {
      this.minusScore();
    }
  }

  /**
   * @param {string} word
   */
  answerWord(word) {
    const tempWord = this.word.split('');
    if (this.word == word) {
      this.hiddenWord.map((char, index) => {
        this.hiddenWord[index] = tempWord[index];
      });
      console.log(this.hiddenWord.join(''));
      return true;
    } else {
      this.minusScore();
      return false;
    }
  }

  minusScore() {
    this.score = this.score - this.scoreModifier;
  }
};
