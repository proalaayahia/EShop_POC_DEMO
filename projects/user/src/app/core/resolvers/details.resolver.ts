import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { IProductModel } from '../../models/product.model';

export const DetailsResolver: ResolveFn<IProductModel | null> = (route, state) => {
  const productService = inject(ProductService)
  const id=parseInt(route.paramMap.get('id')!)
  return productService.getProductById(id)
};
