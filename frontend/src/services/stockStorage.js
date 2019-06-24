import StockService from './stocks';
import moment from 'moment';
class StockStorage{
  constructor() {
    this.date = moment().add(-1,'months').format('YYYY-MM-DD');
    this.stocks = {};
    this.favs = {};
    this.currency = 'EUR';
  }

  addStocks(symbolArray) {
    const upperCaseArray = symbolArray.map(sym => sym.toUpperCase());
    const newSymbols = upperCaseArray.filter(sym => !this.stocks[sym]);
    StockService.getStocks(newSymbols, this.date).then(({data: { data }}) => {
      console.log(data);
      this.stocks = { ...this.stocks, ...data};
      return Promise.resolve(newSymbols.join(' '));
    });
  }

  rmStocks(symbolArray) {
    const upperCaseArray = symbolArray.map(sym => sym.toUpperCase());
    upperCaseArray.forEach(sym => { delete this.stocks[sym]});    
  }

  initializeFavs(favs) {
    this.favs = favs;
  }


  addFavs(symbolArray, date, currency){
    console.log(symbolArray);
    const upperCaseArray = symbolArray.map(sym => sym.toUpperCase());
    const newSymbols = upperCaseArray.filter(sym => !this.favs[sym]);
    StockService.addFavs(newSymbols, date, currency).then(({ data: { data } }) => {
      this.favs = { ...this.favs, ...data };
    })
  }

  setDate(date){
    this.date = date;
    this.refresh();
  }

  setCurrency(cur) {
    this.currency = cur;
  }

  refresh() {
    StockService.getStocks(Object.keys(this.favs), this.date).then(({data}) => { this.favs = data;});
    StockService.getStocks(Object.keys(this.favs), this.date).then(({data}) => { this.stocks = data;});
  }
}

export default new StockStorage();

