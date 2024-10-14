module.exports = class CSVParser {
  #rowsDelimiter = "\n";
  #valuesDelimiter = ",";
  constructor() {}

  splitRows(dataString = "") {
    return dataString.split(this.#rowsDelimiter);
  }

  normalizeData(value) {
    const trimmedValue = value.trim();
    const parsed = Number.parseInt(trimmedValue);
    return Number.isNaN(parsed) ? trimmedValue : parsed;
  }

  splitValues(rows = []) {
    // for (let rowIndex = 0; rowIndex < rows.length; rowIndex++){
    //   rows[rowIndex] = rows[rowIndex].split(this.#valuesDelimiter).map(this.normalizeData);
    // }
    // return rows
    const splitValues = (row) =>
      row.split(this.#valuesDelimiter).map(this.normalizeData);

    return rows.map(splitValues);
  }

  parse(data = "") {
    if (data.length === 0)
      return {
        headers: [],
        rows: [],
      };
    const rowsString = this.splitRows(data);
    const rows = this.splitValues(rowsString);
    const headers = rows.shift();
    return {
      headers,
      rows,
    };
  }
};
