module.exports = class OperationContext {
  constructor(table) {
    this.table = table;
    this.operation = null;
  }

  setOperation(Operation) {
    // operations may be an array
    this.operation = new Operation(this.table);
  }

  exec() {
    this.operation.exec();
  }
};
