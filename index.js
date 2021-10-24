require('colors');

const { showMenu, pause, opt } = require('./helpers/messages');

const main = async() => {
  let option = '';

  do{
    option = await showMenu();

    console.log({option});

    option !== '0' && await pause();
  }while(option !== '0');

  console.clear();
}

main();