import { computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { CreateProductRequest } from "@shared/interfaces/product";
import { NotificationService } from "@shared/services/notification.service";
import { ProductsService } from "@shared/services/products.service";

export class EditProductState {
  productService = inject(ProductsService)
  notify = inject(NotificationService)
  router = inject(Router)

  formData = computed( () => this.productService.product() )

  async onUpdateProduct(product: CreateProductRequest) {
    try {
      const response = await this.productService.update(product)
      this.notify.setMessage(response.message)
      this.productService.getRows()
      this.router.navigate(['/'])
    } catch (_e) {
      this.notify.setGlobalError()
    }
  }
}
