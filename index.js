require("colors");

const {
  inquirerMenu,
  pause,
  readInput,
  listTasksDelete,
  confirmDelete,
  completeTasks,
} = require("./helpers/inquirer");

const { saveDB, readDB } = require("./helpers/saveFile");
const Task = require("./models/task");
const Tasks = require("./models/tasks");

const main = async () => {
  let option = "";
  const tasks = new Tasks();

  const tasksDB = readDB();

  if (tasksDB) {
    tasks.loadTasksFromArr(tasksDB);
  }

  do {
    option = await inquirerMenu();

    switch (option) {
      case "1":
        const description = await readInput("Descripción: ");
        console.log(description);
        tasks.createTask(description);
        break;

      case "2":
        tasks.listingTasks();
        break;
      case "3":
        tasks.completeTasksListing(true);
        break;
      case "4":
        tasks.completeTasksListing(false);
        break;
      case "5":
        const ids = await completeTasks(tasks.listingArr)
        tasks.checkToggleTasks(ids);
        break;
      case "6":
        const id = await listTasksDelete(tasks.listingArr);
        if (id !== "0") {
          const confirm = await confirmDelete();
          if (confirm) {
            tasks.deleteTask(id);
            console.log("Tarea eliminada.".green);
          }
        }
        break;
    }

    saveDB(tasks.listingArr);

    await pause();
  } while (option !== "0");

  console.clear();
};

main();
