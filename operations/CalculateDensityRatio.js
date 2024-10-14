module.exports = class CalculateDensityRatio {
  constructor(table) {
    this.table = table;
    this.targetColumnIndex = this.table.headers.findIndex(
      (columnName) => columnName === "density",
    );
  }

  getMaxDensity() {
    let max = 0;
    for (const row of this.table.rows) {
      const density = row[this.targetColumnIndex];
      max = Math.max(density, max);
    }
    return max;
  }

  exec() {
    if (this.targetColumnIndex === -1) return;
    const maxDensity = this.getMaxDensity();
    this.table.headers.push("density ratio");
    for (const row of this.table.rows) {
      const density = row[this.targetColumnIndex];
      row.push(Math.round((density * 100) / maxDensity));
    }
  }
};
