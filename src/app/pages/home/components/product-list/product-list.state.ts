import { computed, inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { ProductsService } from "@shared/services/products.service";
import { Product } from "@shared/models/product.model";
import { NotificationService } from "@/app/shared/services/notification.service";

@Injectable()
export class ProductListState {
  router = inject(Router)
  productService = inject(ProductsService)
  notify = inject(NotificationService)

  selected = signal<Product | null>(null)
  openRowId = signal<string | null>(null)

  isEmpty = computed( () => {
    const hasProducts = this.productService.products().length === 0
    return !this.productService.isLoading() && hasProducts
  })

  isLoading = computed( () => this.productService.isLoading() )

  toggleDropdown(id: string) {
    this.openRowId.update(prev => prev === id ? null : id)
  }
  closeDropdown() {
    this.openRowId.set(null)
  }
  goEdit(productId: string) {
    this.router.navigate(['/products/', productId])
  }
  openDelete(product: Product) {
    this.selected.set(product)
    this.closeDropdown()
  }
  closeDelete() {
    this.selected.set(null)
  }
  async confirmDelete() {
    try {
      const productId = this.selected()?.id
      if ( !productId ) return;
      const response = await this.productService.delete(productId)
      this.notify.setMessage(response.message)
      this.productService.getRows()
      this.closeDelete()
    } catch (_e) {
      this.notify.setGlobalError()
    }
  }
}
