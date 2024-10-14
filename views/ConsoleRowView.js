module.exports = class ConsoleRowView {
  #pads = [18, 10, 8, 8, 18, 6];
  constructor(table) {
    this.table = table;
  }

  rowToString(row) {
    let rowString = "";
    for (let valueIndex = 0; valueIndex < row.length; valueIndex++) {
      const value = row[valueIndex].toString();
      const pad = this.#pads[valueIndex] || 0;
      rowString += valueIndex === 0 ? value.padEnd(pad) : value.padStart(pad);
    }
    return rowString;
  }

  render() {
    for (const row of this.table.rows) {
      console.log(this.rowToString(row));
    }
  }
};
