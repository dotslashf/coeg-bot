class Mock {
  constructor(inputText) {
    this.text = inputText;
  }

  mockText() {
    let outputText = '',
      mockModifier = Math.round(Math.random());
    let text = this.text.toLowerCase();

    for (let index = 0; index < text.length; index++) {
      if (index % 2 == mockModifier) {
        outputText += text[index].toUpperCase();
      } else {
        outputText += text[index];
      }
    }
    return outputText;
  }
}

module.exports = Mock;
