import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Stock } from 'src/app/model/stock';

let counter = 1;

@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.css'],
})
export class CreateStockComponent {
  // public stockForm: FormGroup = new FormGroup({
  //   name: new FormControl(null, Validators.required),
  //   code: new FormControl(null, [Validators.required, Validators.minLength(2)]),
  //   price: new FormControl(0, [Validators.required, Validators.min(0)]),
  // });
  private stock: Stock;
  public stockForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.createForm();
    this.stock = new Stock('Test' + counter++, 'TST', 20, 10); // ��l�ƪѲ��ҫ�
  }
  get name() {
    return this.stockForm.get('name');
  }
  get price() {
    return this.stockForm.get('price');
  }
  get code() {
    return this.stockForm.get('code');
  }

  createForm() {
    this.stockForm = this.fb.group({
      name: [null, Validators.required],
      code: [null, [Validators.required, Validators.minLength(2)]],
      price: [0, [Validators.required, Validators.min(0)]],
    });
  }

  loadStockFromServer() {
    this.stock = new Stock('Test' + counter++, 'TST', 20, 10);
    const stockFormModel = Object.assign({}, this.stock);
    delete stockFormModel.previousPrice;
    delete stockFormModel.favorite;
    this.stockForm.setValue(stockFormModel); // �Hstock��Ƽҫ��ȳ]�w��Ӫ��ҫ�
  }
  patchStockForm() {
    this.stock = new Stock(`Test ${counter++}`, 'TST', 20, 10);
    this.stockForm.patchValue(this.stock); // �H�i������s���ҫ��C
  }

  resetForm() {
    this.stockForm.reset(); // ���m�����l���A
  }

  onSubmit() {
    this.stock = Object.assign({}, this.stockForm.value); // ���n�����������ҫ�����Ƽҫ��C�ӬO�ƻs���C
    console.log('Saving stock', this.stock);
  }
}
