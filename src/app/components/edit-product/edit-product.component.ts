import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productFormGroup: FormGroup | null = null;
  submitted: boolean = false;
  productId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private fb: FormBuilder
  ) {
    this.productId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.productService.getProductById(this.productId)
      .subscribe(product => {
        this.productFormGroup = this.fb.group({
          id: [product.id, Validators.required],
          name: [product.name, Validators.required],
          price: [product.price, Validators.required],
          quantity: [product.quantity, Validators.required],
          selected: [product.selected, Validators.required],
          available: [product.available, Validators.required]
        });
      });
  }

  onSaveEditProduct() {
    this.submitted = true;
    if (this.productFormGroup?.invalid) return;
    this.productService.updateProduct(this.productFormGroup?.value)
      .subscribe(data => {
        console.log(data);
        this.router.navigateByUrl('/products');
      });
  }
}
