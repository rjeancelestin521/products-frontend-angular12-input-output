export enum ProductActionsTypes {
  GET_ALL_PRODUCTS= "[Product] Get All Products",
  GET_SELECTED_PRODUCTS = "[Product] Get Selected Products",
  GET_AVAILABLE_PRODUCTS = "[Product] Get Available Products",
  SEARCH_PRODUCTS = "[Product] Search Products",
  NEW_PRODUCT = "[Product] New Product",
  EDIT_PRODUCT = "[Product] Edit Product",
  SELECT_PRODUCT = "[Product] Select Product",
  DELETE_PRODUCT = "[Product] Delete Product"
}

export interface ProductActionEvent {
  type: ProductActionsTypes;
  payload?: any;
}

export enum DataStateEnum {
  LOADING,
  LOADED,
  ERROR
}

export interface AppDataState<T> {
  dataState?: DataStateEnum;
  data?: T;
  errorMessage?: string;
}
