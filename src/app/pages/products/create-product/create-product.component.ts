import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormProductComponent } from '../components/form-product/form-product.component';
import { ProductsService } from '@shared/services/products.service';
import { CreateProductRequest } from '@shared/interfaces/product';
import { NotificationService } from '@shared/services/notification.service';

@Component({
  selector: 'create-product',
  styleUrl: './create-product.component.scss',
  templateUrl: 'create-product.component.html',
  imports: [ FormProductComponent ]
})

export class CreateProductComponent {
  productService = inject(ProductsService)
  notify = inject(NotificationService)

  router = inject(Router)

  async onCreateProduct(product: CreateProductRequest) {
    try {

      const response = await this.productService.save(product)
      this.notify.setMessage(response.message)
      this.productService.getRows()
      this.router.navigate(['/'])
    } catch (_e) {
      this.notify.setGlobalError()
    }
  }


}
