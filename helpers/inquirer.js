require("colors");

const inquirer = require("inquirer");
const Tasks = require("../models/tasks");

const questions = [
  {
    type: "list",
    name: "option",
    message: "¿Qué desea hacer?",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Crear tarea`,
      },
      {
        value: "2",
        name: `${"2.".green} Listar tareas`,
      },
      {
        value: "3",
        name: `${"3.".green} Listar tareas completadas`,
      },
      {
        value: "4",
        name: `${"4.".green} Listar tareas pendientes`,
      },
      {
        value: "5",
        name: `${"5.".green} Completar tarea`,
      },
      {
        value: "6",
        name: `${"6.".green} Borrar una tarea`,
      },
      {
        value: "0",
        name: `${"0.".green} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("============================".rainbow);
  console.log("   Selecciona una opcion".yellow);
  console.log("============================\n".rainbow);

  const { option } = await inquirer.prompt(questions);

  return option;
};

const pause = async () => {
  const question = [
    {
      type: "input",
      name: "pause",
      message: `Presione ${"ENTER".cyan} para continuar`,
    },
  ];
  console.log("\n");

  await inquirer.prompt(question);
};

const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "description",
      message: message.brightMagenta.italic,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor".red;
        }

        return true;
      },
    },
  ];

  const { description } = await inquirer.prompt(question);

  return description;
};

const listTasksDelete = async (tasks = {}) => {
  const choices = tasks.map((task, id) => {
    return {
      value: task.id,
      name: (id + 1 + ". ").magenta + task.description,
    };
  });

  const { getTask: taskId } = await inquirer.prompt([
    {
      type: "list",
      name: "getTask",
      message: "¿Qué tarea desea eliminar?".blue,
      choices,
    },
  ]);

  return taskId;
};

const confirmDelete = async () => {
  const { deleteTask: confirm } = await inquirer.prompt([
    {
      type: "confirm",
      name: "deleteTask",
      message: "¿Está segur@ que quiere eliminar la tarea?".brightRed,
    },
  ]);

  return confirm;
};

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  listTasksDelete,
  confirmDelete,
};
