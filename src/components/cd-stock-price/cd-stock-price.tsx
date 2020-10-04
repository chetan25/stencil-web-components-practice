import {Component, State, Element, Prop, Watch, h, Listen} from '@stencil/core';
import { AV_API_KEY } from '../../global/global';

// 7SHTAYLLVYMJMGZO

@Component({
  tag: 'cd-stock-price',
  styleUrl: 'cd-stock-price.css',
  shadow: true,
})
export class CdStockPrice {
  @State() price: number = 0.0;
  @State() userInp: string;
  @State() isStockValid: boolean = false;
  @State() hasError: boolean = false;
  @State() loading: boolean = false;

  @Prop({reflect: true, mutable: true}) symbol: string;

  @Watch( 'symbol')
  stockSymbolChange(newValue: string, oldValue: string) {
    console.log(newValue, oldValue);
    if (newValue !== oldValue) {
      this.fetchPrice(newValue);
    }
  }

  @Element() el: HTMLElement;

  stockInp: HTMLInputElement;
  // initialSymbol: string;

  // order of execution
  componentWillLoad() {
    // 1. runs before component is loaded, can also change Prop/State value
    console.log('component will load');
    console.log(this.symbol);
  }

  componentDidLoad() {
    // 2 component loaded
    console.log('component loaded');
    if (this.symbol) {
      this.userInp = this.symbol;
      this.isStockValid = true;
      // this.initialSymbol = this.symbol;
      this.fetchPrice(this.symbol);
    }
  }

  componentWillUpdate() {
    // fires before re-render as some state or prop change
    console.log('component will update');
  }

  componentDidUpdate() {
    // fires after re-render
    console.log('component did update');
    // if (this.symbol != this.initialSymbol) {
    //   this.fetchPrice(this.symbol);
    //   this.initialSymbol = this.symbol;
    // }
  }

  disconnectedCallback() {
    console.log('component removed from dom');
  }

  // Listen by default listens to event emitted locally,
  // adding a 'body:' tells it to listen to global event
  @Listen('cdSymbolSelected', {target: 'body'})
  onStockSymbolSelected(event: CustomEvent) {
    console.log('symbol selected', event.detail);
    if (event.detail && event.detail !== this.userInp) {
      this.fetchPrice(event.detail);
      this.userInp = event.detail;
    }
  }

  fetchPrice = (stockSymbol: string) => {
    this.loading = true;
    fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        if (data['Global Quote']['05. price']) {
          this.price = +data['Global Quote']['05. price'];
        }
        this.loading = false;
      })
      .catch(err => {
        console.log('Error Occurred', err);
        this.hasError = true;
        this.loading = false;
      });
  }

  onFetch = (event :Event) => {
    event.preventDefault();
    const stockEl: HTMLInputElement = this.el.shadowRoot.querySelector ('#stock-symbol');
    const stockSymbol2 = stockEl.value;
    console.log(stockSymbol2);
    const stockSymbol = this.stockInp.value;
     this.fetchPrice(stockSymbol);
  }

  handleChange = (event: Event) => {
    event.preventDefault();
    this.userInp = (event.target as HTMLInputElement).value;
    if (this.userInp.trim() !== '') {
      this.isStockValid = true;
    } else {
      this.isStockValid = false;
    }
  }

  hostData() {
    return {
      class: this.hasError ? 'error' : '',
      style: 'font-weight: 500'
    }
  }

  render() {
    return [
      <section>
        <h1>Search Stock Price</h1>
        <form onSubmit={this.onFetch}>
          <input
            id="stock-symbol"
            ref={el => this.stockInp = el}
            value={this.userInp}
            onInput={this.handleChange}
          />
          <button type="submit" disabled={!this.isStockValid || this.loading}>Fetch</button>
        </form>
      </section>,
      <section>
        <h1>Stock Data</h1>
        <div>
          { this.loading ? <cd-spinner></cd-spinner>:  <h3>Price: ${this.price}</h3> }
        </div>
      </section>
    ];
  }
}
