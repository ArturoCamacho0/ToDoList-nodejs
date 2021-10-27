const moment = require("moment");
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

  loadTasksFromArr(tasks = []) {
    tasks.map((task) => {
      this._listing[task.id] = task;
    });
  }

  createTask(description = "") {
    const tarea = new Task(description);
    this._listing[tarea.id] = tarea;
  }

  listingTasks() {
    this.listingArr.map((task, i) => {
      const complete = task.completeOn ? "COMPLETADA".green : "PENDIENTE".red;
      console.log(`${i + 1}- `.magenta + task.description + " :: " + complete);
    });
  }

  completeTasksListing(complete = true) {
    let counter = 0;

    this.listingArr.map((task) => {
      const { description, completeOn } = task;

      if (completeOn) {
        if (complete) {
          counter++;
          console.log(
            `${counter}- `.magenta +
              description +
              " :: " +
              "COMPLETADA".green +
              ` - ${moment(completeOn).calendar()}`.white
          );
        }
      } else {
        if (!complete) {
          counter++;
          console.log(
            `${counter}- `.magenta + description + " :: " + "PENDIENTE".red
          );
        }
      }
    });
  }

  deleteTask(id = "") {
    if (this._listing[id]) {
      delete this._listing[id];
    }
  }

  checkToggleTasks(ids = []) {
    ids.forEach((id) => {
      const task = this._listing[id];
      if (!task.completeOn) {
        task.completeOn = moment().format(); ;
      }
    });

    this.listingArr.forEach(task => {
      if(!ids.includes(task.id)){
        this._listing[task.id].completeOn = null;
      }
    });
  }
}

module.exports = Tasks;
