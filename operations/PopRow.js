module.exports = class PopRow {
    constructor(table) {
        this.table = table;
    }

    exec() {
        this.table.rows.pop()
    }
};
