module.exports = class ViewContext {
  constructor(table) {
    this.table = table;
    this.view = null;
  }

  setView(View) {
    this.view = new View(this.table);
  }

  render() {
    this.view.render();
  }
};
