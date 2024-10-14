module.exports = class ParserContext {
  constructor(rawData = "") {
    this.rawData = rawData;
    this.parser = null;
  }

  setParser(Parser) {
    this.parser = new Parser();
  }

  parse() {
    return this.parser.parse(this.rawData);
  }
};
