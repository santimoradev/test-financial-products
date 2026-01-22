import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormProductComponent } from '../components/form-product/form-product.component';
import { ProductsService } from '@shared/services/products.service';
import { CreateProductRequest } from '@shared/interfaces/product';

@Component({
  selector: 'create-product',
  styleUrl: './create-product.component.scss',
  templateUrl: 'create-product.component.html',
  imports: [ FormProductComponent ]
})

export class CreateProductComponent {
  productService = inject(ProductsService)
  router = inject(Router)

  async onCreateProduct(product: CreateProductRequest) {
    await this.productService.save(product)
    this.productService.getRows()
    this.router.navigate(['/'])
  }

}
