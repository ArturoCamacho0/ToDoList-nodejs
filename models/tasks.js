const Task = require("./task");

class Tasks {
  _listing = {};

  get listingArr() {
    const listing = [];

    Object.keys(this._listing).forEach((key) => {
      const task = this._listing[key];
      listing.push(task);
    });

    return listing;
  }

  constructor() {
    this._listing = {};
  }

  createTask(description = "") {
    const tarea = new Task(description);
    this._listing[tarea.id] = tarea;
  }
}

module.exports = Tasks;
