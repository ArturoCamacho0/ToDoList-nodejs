const { v4: uuidv4 } = require("uuid");

class Task {
  id = "";
  description = "";
  completeOn = null;

  constructor(description) {
    this.id = uuidv4();
    this.description = description;
    this.completeOn = null;
  }
}

module.exports = Task;
