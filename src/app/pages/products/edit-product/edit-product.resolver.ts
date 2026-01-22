import { inject } from '@angular/core'
import { ResolveFn } from '@angular/router'
import { ProductsService } from '@shared/services/products.service'

export const productByIdResolver: ResolveFn<void> = async (route) => {
  const productService = inject(ProductsService)
  const id = route.paramMap.get('id')!;

  await productService.getById(id)
}
