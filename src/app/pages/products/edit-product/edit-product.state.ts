import { computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { CreateProductRequest } from "@shared/interfaces/product";
import { ProductsService } from "@shared/services/products.service";

export class EditProductState {
  productService = inject(ProductsService)
  router = inject(Router)

  formData = computed( () => this.productService.product() )

  async onUpdateProduct(product: CreateProductRequest) {
    await this.productService.update(product)
    this.productService.getRows()
    this.router.navigate(['/'])
  }
}
