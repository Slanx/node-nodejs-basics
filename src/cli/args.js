export const parseArgs = (paringBySymbols) => {
  const arrOfArgs = process.argv.slice(2);
  const arrOfResults = [];
  for (let i = 0; i < arrOfArgs.length - 1; i++) {
    if (arrOfArgs[i].includes(paringBySymbols)) {
      if (arrOfArgs.length - 1 !== i) {
        const str = `${arrOfArgs[i].slice(paringBySymbols.length)} is ${arrOfArgs[i + 1]}`;
        arrOfResults.push(str);
        i++;
      }
    }
  }
  console.log(arrOfResults.join(', '));
};

parseArgs('--');
