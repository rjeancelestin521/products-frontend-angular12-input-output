import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {AppDataState, DataStateEnum, ProductActionEvent, ProductActionsTypes} from "../../../state/product.state";
import {Product} from "../../../models/product.model";
import {$e} from "@angular/compiler/src/chars";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  @Input() productsInput$: Observable<AppDataState<Product[]>> | null = null;
  @Output() productEventEmitter: EventEmitter<ProductActionEvent> = new EventEmitter();
  readonly DataStateEnum = DataStateEnum;

  constructor() { }

  ngOnInit(): void {
  }

  onSelectProduct(product: Product) {
    this.productEventEmitter.emit({
      type: ProductActionsTypes.SELECT_PRODUCT,
      payload: product
    });
  }

  onEditProduct(product: Product) {
    this.productEventEmitter.emit({
      type: ProductActionsTypes.EDIT_PRODUCT,
      payload: product
    });
  }

  onDeleteProduct(product: Product) {
    this.productEventEmitter.emit({
      type: ProductActionsTypes.DELETE_PRODUCT,
      payload: product
    });
  }

  onProductActionEvent($event: ProductActionEvent) {
    this.productEventEmitter.emit($event);
  }
}
