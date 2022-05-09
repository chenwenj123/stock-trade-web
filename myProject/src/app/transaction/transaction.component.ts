import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})

export class TransactionComponent implements OnInit {
  //input retrieve value from its parent component 
  @Input() public ticker: string;
  @Input() public name: string;
  @Input() public currentPrice: number;
  @Input() public opt: string; // 'Buy' or 'Sell'
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  inputQuantity: number = 0;
  purchasedQuantity: number = 0;
  stockItem;
  walletmoney;
  wallet;



  getTickerStorage() {
    let portfolioArr = localStorage.getItem('Portfolio')
      ? JSON.parse(localStorage.getItem('Portfolio'))
      : [];
    if (this.opt == 'Sell') {
      this.stockItem = portfolioArr.filter(
        (data) => data.ticker == this.ticker
      )[0]; //定义stockitem portfolio 里面存在这个股票
      this.purchasedQuantity = this.stockItem.quantity;
    } else if (this.opt === 'Buy') {
      this.stockItem = portfolioArr.filter((data) => data.ticker == this.ticker)
        .length
        ? portfolioArr.filter((data) => data.ticker == this.ticker)[0]
        : { ticker: this.ticker, name: this.name, quantity: 0, totalCost: 0 };
    }
  }

  public executeOpt() {
    if (this.opt === 'Sell') {
      let avgcost = this.stockItem.totalCost / this.stockItem.quantity;
      this.walletmoney=parseFloat(localStorage.getItem('Wallet'))
      this.walletmoney +=this.currentPrice * this.inputQuantity; //wallet
      this.stockItem.quantity -= this.inputQuantity;
      this.stockItem.totalCost -= avgcost * this.inputQuantity;
      console.log(
        `Sell ${this.ticker} ${this.inputQuantity}, ${this.stockItem.quantity} left, totalCost ${this.stockItem.totalCost}`
      );
      localStorage.setItem('Wallet', JSON.stringify(this.walletmoney));
      this.fetchwallet();
    } else if (this.opt === 'Buy') {
      this.walletmoney=parseFloat(localStorage.getItem('Wallet'))
      this.walletmoney -=this.currentPrice * this.inputQuantity;
      this.stockItem.quantity += this.inputQuantity;
      this.stockItem.totalCost += this.currentPrice * this.inputQuantity;
      console.log(
        `Buy ${this.ticker} ${this.inputQuantity}, ${this.stockItem.quantity} now, totalCost ${this.stockItem.totalCost}`
      );
      localStorage.setItem('Wallet', JSON.stringify(this.walletmoney));
      this.fetchwallet();
    }

    let portfolioArr = localStorage.getItem('Portfolio')
      ? JSON.parse(localStorage.getItem('Portfolio'))
      : [];
    if (!this.stockItem.quantity) {
      // delete stockItem from localStorage
      let portfolioArrNew = portfolioArr.filter(
        (data) => data.ticker != this.ticker
      );
      localStorage.setItem('Portfolio', JSON.stringify(portfolioArrNew));
    } else {
      // replace stockItem from localStorage
      if (portfolioArr.filter((item) => item.ticker == this.ticker).length) {
        portfolioArr.forEach((item, i) => {
          if (item.ticker == this.stockItem.ticker) {
            portfolioArr[i] = this.stockItem;
          }
        });
      } else {
        portfolioArr.push(this.stockItem);
      }
      localStorage.setItem('Portfolio', JSON.stringify(portfolioArr));
    }
    this.transModalService.close(this.stockItem);
  }

  fetchwallet(){
    this.wallet=parseFloat(localStorage.getItem('Wallet'))
  }

  constructor(public transModalService: NgbActiveModal) { }

  ngOnInit(): void {
    this.getTickerStorage();
    this.fetchwallet();
  }
  

}
