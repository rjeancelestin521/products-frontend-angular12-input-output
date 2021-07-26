import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../models/product.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }


  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.host + '/all');
  }

  getSelectedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.host + '/selectedProduct');
  }

  getAvailableProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.host + '/availableProduct');
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(environment.host + '/' + productId);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(environment.host, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(environment.host + '/update/' + product.id, product);
  }

  deleteProduct(product: Product): Observable<void> {
    return this.http.delete<void>(environment.host + '/delete/' + product.id);
  }

  selectProduct(product: Product): Observable<Product> {
    product.selected = !product.selected;
    return this.http.put<Product>(environment.host + '/update/' + product.id, product);
  }

  getProductsByNameContains(keyword: string): Observable<Product[]> {
    return this.http.get<Product[]>(environment.host + '/searchByName?name=' + keyword);
  }

}
