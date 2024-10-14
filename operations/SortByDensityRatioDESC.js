module.exports = class SortByDensityRatioDESC {
  constructor(table) {
    this.table = table;
    this.targetColumnIndex = this.table.headers.findIndex(
      (columnName) => columnName === "density ratio",
    );
  }

  exec() {
    if (this.targetColumnIndex === -1) return;
    this.table.rows.sort((row1, row2) => {
      return row2[this.targetColumnIndex] - row1[this.targetColumnIndex];
    });
  }
};
