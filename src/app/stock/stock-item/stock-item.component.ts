import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Stock } from '../../model/stock';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.css'],
})
export class StockItemComponent {
  @Input() public stock: Stock;
  @Output() toogleFavorite: EventEmitter<Stock>;

  constructor() {
    this.toogleFavorite = new EventEmitter<Stock>();
  }

  onToggleFavorite(event) {
    this.toogleFavorite.emit(this.stock);
  }
}
