require("colors");

const { inquirerMenu, pause, readInput } = require("./helpers/inquirer");
const { saveDB } = require("./helpers/saveFile");
const Task = require("./models/task");
const Tasks = require("./models/tasks");

const main = async () => {
  let option = "";
  const tasks = new Tasks();

  do {
    option = await inquirerMenu();

    switch (option) {
      case "1":
        const description = await readInput("Descripción: ");
        console.log(description);
        tasks.createTask(description);
        break;

      case "2":
        console.log(tasks.listingArr);
        break;
    }

    saveDB(tasks.listingArr);

    await pause();
  } while (option !== "0");

  console.clear();
};

main();
