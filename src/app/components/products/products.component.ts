import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Observable, of} from "rxjs";
import {AppDataState, DataStateEnum, ProductActionEvent, ProductActionsTypes} from "../../state/product.state";
import {Product} from "../../models/product.model";
import {catchError, map, startWith} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productsData$: Observable<AppDataState<Product[]>> | null = null;

  constructor(
    private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsData$ = this.productService.getProducts()
      .pipe(
        map(data =>({dataState: DataStateEnum.LOADED, data: data})),
        startWith({dataState: DataStateEnum.LOADING}),
        catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
      );
  }

  onGetSelectedProducts() {
    this.productsData$ = this.productService.getSelectedProducts()
      .pipe(
        map(data => ({ dataState: DataStateEnum.LOADED, data: data })),
        startWith({ dataState: DataStateEnum.LOADING }),
        catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
      );
  }

  onGetAvailableProducts() {
    this.productsData$ = this.productService.getAvailableProducts()
      .pipe(
        map(data => ({ dataState: DataStateEnum.LOADED, data: data })),
        startWith({ dataState: DataStateEnum.LOADING }),
        catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
      )
  }

  onSearchProductByName(dataForm: any) {
    this.productsData$ = this.productService.getProductsByNameContains(dataForm.keyword)
      .pipe(
        map(data => ({ dataState: DataStateEnum.LOADED, data: data })),
        startWith({ dataState: DataStateEnum.LOADING }),
        catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
      );
  }

  onNewProduct() {
    this.router.navigateByUrl('/newProduct');
  }

  onEditProduct(product: Product) {
    this.router.navigateByUrl('/editProduct/' + product.id);
  }

  onSelectProduct(product: Product) {
    this.productService.selectProduct(product)
      .subscribe(data => {
        product.selected = data.selected;
      })
  }

  onDeleteProduct(product: Product) {
    let response = confirm('Etes vous sûre ?');
    if( response ) {
      this.productService.deleteProduct(product)
        .subscribe(data => {
          this.getProducts();
        })
    }
  }

  onProductActionEvent($event: ProductActionEvent) {
    switch ($event.type) {
      case ProductActionsTypes.GET_ALL_PRODUCTS: this.getProducts(); break;
      case ProductActionsTypes.GET_SELECTED_PRODUCTS: this.onGetSelectedProducts(); break;
      case ProductActionsTypes.GET_AVAILABLE_PRODUCTS: this.onGetAvailableProducts(); break;
      case ProductActionsTypes.NEW_PRODUCT: this.onNewProduct(); break;
      case ProductActionsTypes.SEARCH_PRODUCTS: this.onSearchProductByName($event.payload); break;
      case ProductActionsTypes.SELECT_PRODUCT: this.onSelectProduct($event.payload); break;
      case ProductActionsTypes.EDIT_PRODUCT: this.onEditProduct($event.payload); break;
      case ProductActionsTypes.DELETE_PRODUCT: this.onDeleteProduct($event.payload); break;
    }
  }
}
