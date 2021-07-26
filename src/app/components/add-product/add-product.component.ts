import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productFormGroup: FormGroup | null = null;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.productFormGroup = this.fb.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      selected: [false, Validators.required],
      available: [true, Validators.required]
    });
  }

  onSaveNewProduct() {
    this.submitted = true;
    if (this.productFormGroup?.invalid) return;
    this.productService.createProduct(this.productFormGroup?.value)
      .subscribe(data => {
        this.router.navigateByUrl('/products');
      });
  }
}
