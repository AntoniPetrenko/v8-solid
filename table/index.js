module.exports = class Table {
    constructor({ headers = [], rows = [] }) {
        this.headers = headers;
        this.rows = rows;
    }
};
