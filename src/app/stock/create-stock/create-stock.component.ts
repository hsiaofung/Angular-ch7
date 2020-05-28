import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  FormArray,
  FormArrayName,
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
  public stock: Stock;
  public stockForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.createForm();
    this.stock = new Stock('Test' + counter++, 'TST', 20, 10); // 初始化股票模型
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
      notablePeople: this.fb.array([]), // notablePeople初始化為FormArray實例
    });
  }

  get notablePeople(): FormArray {
    // 方便從模板存取FormArray的getter
    return this.stockForm.get('notablePeople') as FormArray;
  }

  // 將新的FormGroup實例加入FormArray
  addNotablePerson() {
    this.notablePeople.push(
      this.fb.group({
        name: ['', Validators.required],
        title: ['', Validators.required],
      })
    );
  }

  // 從FormArray刪除特定FormGroup實例。
  removeNotablePerson(index: number) {
    this.notablePeople.removeAt(index);
  }

  loadStockFromServer() {
    this.stock = new Stock('Test' + counter++, 'TST', 20, 10);
    const stockFormModel = Object.assign({}, this.stock);
    delete stockFormModel.previousPrice;
    delete stockFormModel.favorite;
    this.stockForm.setValue(stockFormModel); // 以stock資料模型值設定整個表單模型
  }
  patchStockForm() {
    this.stock = new Stock(`Test ${counter++}`, 'TST', 20, 10);
    this.stockForm.patchValue(this.stock); // 以可用欄位更新表單模型。
  }

  resetForm() {
    this.stockForm.reset(); // 重置表單到初始狀態
  }

  onSubmit() {
    this.stock = Object.assign({}, this.stockForm.value); // 不要直接指派表單模型給資料模型。而是複製它。
    console.log('Saving stock', this.stock);
  }
}
