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
    this.baseScoreModifier = Math.floor(100 / this.hiddenChar.length);
    this.wrongAnswerMinus = Math.floor(this.baseScoreModifier / 2);
    this.hiddenCharOnly = [];
    this.isDone = false;
    this.underScoreNChar = this.hiddenChar.length;
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
    this.hiddenCharOnly = this.hiddenChar.map(char => {
      return char.char;
    });

    if (this.hiddenCharOnly.includes(char)) {
      this.hiddenChar.forEach((element, index) => {
        if (element.char == char.toLowerCase()) {
          this.hiddenWord[element.i] = char;
          this.underScoreNChar -= 1;
        }
      });

      this.hiddenCharOnly = this.hiddenChar.map(char => {
        return char.char;
      });
    }


    // wrong answer
    if (!this.hiddenCharOnly.includes(char)) {
      this.minusScore(this.wrongAnswerMinus);
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
    if (this.word == word.toLowerCase()) {
      this.hiddenWord = tempWord;
      this.isDone = true;
    }
    // wrong answer
    else {
      this.isDone = false;
      this.minusScore(this.wrongAnswerMinus);
    }
  }

  revealHiddenChar() {
    // only reveal char if only if hiddenchar > 1
    if (this.underScoreNChar > 1) {
      const n = this.hiddenWord.indexOf('_');
      this.hiddenChar.map(element => {
        if (element.i == n) {
          this.hiddenWord[n] = element.char;
          this.hiddenChar.splice(0, 1);
          this.underScoreNChar -= 1;
          this.hiddenCharOnly = this.hiddenChar.map(char => {
            return char.char;
          });
        }
      });
      return true;
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
