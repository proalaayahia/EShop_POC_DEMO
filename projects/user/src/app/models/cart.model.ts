import { IProductModel } from "./product.model";

export interface ICart {
   product: IProductModel,
   quantity: number
}