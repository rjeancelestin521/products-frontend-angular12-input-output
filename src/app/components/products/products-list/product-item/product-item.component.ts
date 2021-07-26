import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../../../models/product.model";
import {ProductActionEvent, ProductActionsTypes} from "../../../../state/product.state";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() productInput: Product | null = null;
  @Output() productEventEmitter: EventEmitter<ProductActionEvent> = new EventEmitter();

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
    })
  }

  onDeleteProduct(product: Product) {
    this.productEventEmitter.emit({
      type: ProductActionsTypes.DELETE_PRODUCT,
      payload: product
    })
  }
}
