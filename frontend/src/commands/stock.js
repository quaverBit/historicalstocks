import StockStorage from '../services/stockStorage';
import stockStorage from '../services/stockStorage';

console.log('.'+ ' '.repeat(3) + '.');

const unifyString = (size, stringArg) => {
  return ' '.repeat(size - stringArg.length) + stringArg;
}

const getMaximumByLength = (size = 0, stringArg) => {
  return size > stringArg.length ? size : stringArg.length;
}

const buildRow = (name, row, lengths) => {
  let result = ''
  result += unifyString(lengths.stock, name) + ' ' + Object.keys(row).map(key => unifyString(lengths[key], row[key])).join(' ') + '\n';
  return result;
}

const buildHeader = (lengths) => {
  return Object.keys(lengths).map(key => unifyString(lengths[key], key)).join(' ') + '\n'
}

const showStocks = (stocks) => {
  const lengths = {
    stock: 5,
    open: 4,
    close: 5,
    high: 4,
    low: 3,
    volume: 6,
  };
  
  Object.keys(stocks).forEach((key) => {
    const stock = stocks[key];
    Object.keys(stock).forEach((subKey) => {
      lengths.stock = getMaximumByLength(lengths.stock, subKey);
      lengths[subKey] = getMaximumByLength(lengths[subKey], stock[subKey]);
    });
  });

  let result = buildHeader(lengths);
  Object.keys(stocks).forEach((key) => {
    const stock = stocks[key];
    result += buildRow(key, stock, lengths);
  })
  return result;

}

export default {
  stock: (commandArgs, print) => {
    const [, operation, ...symbols] = commandArgs;
    switch(operation){
      case 'add': {
        console.log(symbols);
        StockStorage.addStocks(symbols);
        print(`added ${symbols.join(' ')}`);
        break;
      }
      case 'rm': {
        StockStorage.rmStocks(symbols);
        print(`removed ${symbols.join(' ')}`);
        break;
      }
      case 'set': 
        const [subOperation, option] = symbols;
          if(subOperation === 'date') {
            StockStorage.setDate(option);
          } else if (subOperation === 'cur') {
            StockStorage.setCurrency(option);
          }
        break;

      case 'display': 
        print(showStocks(StockStorage.stocks));
        break;
      default: {
        print(`stock ${operation} unknown`);
      }
    }
  },
  fav: (commandArgs, print) => {
    const [, operation, ...symbols] = commandArgs;
    switch(operation){
      case 'add': {
        StockStorage.addFavs(symbols);
        print(`added ${symbols.join(' ')}`);
        break;
      }
      case 'rm': {
        StockStorage.rm(symbols);
        print(`removed ${symbols.join(' ')}`);
        break;
      }
      case 'set': 
        const [subOperation, option] = symbols;
          if(subOperation === 'date') {
            StockStorage.setDate(option);
          } else if (subOperation === 'cur') {
            StockStorage.setCurrency(option);
          }
        break;

      case 'display': 
        print(showStocks(StockStorage.favs));
        break;
      default: {
        print(`stock ${operation} unknown`);
      }
    }
  }
}

export const stockDescriptions = {
  stock: 'manage stocks\nto add:\nstock add <symbol>\nto rm:\nstock rm <symbol>',
}