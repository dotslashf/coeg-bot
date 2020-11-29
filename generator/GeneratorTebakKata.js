const listWords = require('../listWords');
const { random } = require('../util/helper');

module.exports = class GeneratorTebakKata {
  constructor() {
    this.word = listWords[random(listWords.length)];
    this.hiddenWord = [];
    this.hiddenChar = [];
    this.generateHiddenWord();
    this.getHiddenChar();
    this.nChar = this.generateNChar();
    this.score = 100;
    this.scoreModifier = Math.floor(100 / (this.word.length - this.nChar));
    this.hiddenCharOnly = [];
    this.isDone = false;
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
        hiddenWord[i] = '_';
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
      if (element == '_') {
        chars.push({ i: index, char: this.word[index] });
      }
    });
    this.hiddenChar = chars;
  }

  answer(char) {
    this.hiddenChar.forEach(element => {
      if (element.char == char.toLowerCase()) {
        this.hiddenWord[element.i] = char;
      }
    });

    this.hiddenCharOnly = this.hiddenChar.map(char => {
      return char.char;
    });

    // reveal char if wrong
    if (!this.hiddenCharOnly.includes(char)) {
      this.minusScore(this.scoreModifier);
      this.revealHiddenChar();
    }

    if (this.word == this.hiddenWord.join('')) {
      this.isDone = true;
    }
  }

  answerWord(word) {
    const tempWord = this.word.split('');

    this.hiddenCharOnly = this.hiddenChar.map(char => {
      return char.char;
    });

    // correct answer
    if (this.word == word) {
      this.hiddenWord.map((_, index) => {
        this.hiddenWord[index] = tempWord[index];
      });
      this.isDone = true;
    }
    // wrong answer
    else {
      this.isDone = false;
      this.minusScore(this.scoreModifier);
      this.revealHiddenChar();
    }
  }

  revealHiddenChar() {
    // only reveal char if only if hiddenchar > 1
    console.log(this.hiddenCharOnly.length, this.hiddenChar.length);
    if (this.hiddenCharOnly.length > 1) {
      const n = this.hiddenWord.indexOf('_');
      this.hiddenChar.map(element => {
        if (element.i == n) {
          this.hiddenWord[n] = element.char;
          this.hiddenChar.splice(0, 1);
          this.hiddenCharOnly = this.hiddenChar.map(char => {
            return char.char;
          });
        }
      });
    } else {
      console.log('revealhidden kok finish');
    }
  }

  minusScore(minus) {
    this.score -= minus;

    if (this.score <= 0) {
      this.isDone = true;
      this.score = 0;
    }
  }
};
