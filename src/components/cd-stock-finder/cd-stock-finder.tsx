import {Component, State, h, Event, EventEmitter } from '@stencil/core';
import { AV_API_KEY } from '../../global/global';

@Component({
  tag: 'cd-stock-finder',
  styleUrl: 'cd-stock-finder.css',
  shadow: true,
})
export class CdStockFinder {
   stockNameInp: HTMLInputElement;

   @State() loading: boolean = false;
   @State() searchQuery: string = '';
   @State() searchResults: {symbol: string, name: string}[] = [];

   @Event({  eventName: 'cdSymbolSelected', bubbles: true, composed: true}) cdSymbolSelected: EventEmitter<string>;

   onFindStock = (event: Event) => {
     event.preventDefault();
     const stockName = this.stockNameInp.value;
     if (stockName === this.searchQuery) {
       return;
     }
     this.searchQuery = stockName.trim();
     if (this.searchQuery === '') {
       return;
     }
     this.loading = true;
     fetch(
       `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KEY}`
     ).then(res => res.json())
       .then(data => {
         console.log(data);
         this.searchResults = data.bestMatches.map(match => {
            return {
              symbol: match['1. symbol'],
              name: match['2. name']
            }
         });
         this.loading = false;
       })
       .catch(err => {
         console.log(err);
         this.loading = false;
       });
   }

   onSelectSymbol = (symbol: string) => {
     console.log('event fired');
     this.cdSymbolSelected.emit(symbol);
   }

  handleChange = (event: Event) => {
    event.preventDefault();
    this.searchQuery = (event.target as HTMLInputElement).value;
  }

  render() {
    return [
      <form onSubmit={this.onFindStock}>
        <input
          id="stock-symbol"
          ref={el => this.stockNameInp = el}
          placeholder="Enter Company Name to Search"
          onInput={this.handleChange}
        />
        <button type="submit" disabled={this.searchQuery.length === 0}>Find</button>
      </form>,
      <div>
        { this.loading ? <cd-spinner></cd-spinner> : null}
      </div>,
      <ul>
        {
          this.searchResults.map(res => {
            return (
              <li onClick={() => this.onSelectSymbol(res.symbol)}><strong>{res.symbol}</strong> - {res.name}</li>
            );
          })
        }
      </ul>
    ];
  }
}
