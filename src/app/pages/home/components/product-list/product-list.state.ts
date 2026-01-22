import { computed, inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { ProductsService } from "@shared/services/products.service";
import { Product } from "@shared/models/product.model";

@Injectable()
export class ProductListState {
  router = inject(Router)
  productService = inject(ProductsService)

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
    const productId = this.selected()?.id
    if ( !productId ) return;
    await this.productService.delete(productId)
    this.productService.getRows()
    this.closeDelete()
  }
}
