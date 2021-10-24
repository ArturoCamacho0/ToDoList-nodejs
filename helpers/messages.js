require("colors");

const showMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log("============================".green);
    console.log("   Selecciona una opcion".green);
    console.log("============================\n".green);

    console.log(`${"1.".green} Crear una tarea`);
    console.log(`${"2.".green} Listar tareas`);
    console.log(`${"3.".green} Listar tareas completadas`);
    console.log(`${"4.".green} Listar tareas pendientes`);
    console.log(`${"5.".green} Completar tarea`);
    console.log(`${"6.".green} Borrar una tarea`);
    console.log(`${"0.".green} SALIR`);

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question("Seleccione una opcion: ", (option) => {
      readline.close();
      resolve(option);
    });
  });
};

const pause = () => {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(
      `\nPresione ${"ENTER".cyan} para continuar...`,
      (option) => {
        readline.close();
        resolve(option);
      }
    );
  });
};

module.exports = {
  showMenu,
  pause,
};
