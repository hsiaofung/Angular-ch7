import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';

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

  public stockForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.createForm();
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

  onSubmit() {
    console.log('Stock Form Value', this.stockForm.value);
  }
}