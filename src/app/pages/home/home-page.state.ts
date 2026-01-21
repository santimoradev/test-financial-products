import { Product } from "@/app/shared/models/product.model";
import { ProductsService } from "@/app/shared/services/products.service";
import { computed, inject, Injectable, signal } from "@angular/core";

@Injectable()
export class HomeState {
  private loading = signal(false)
  productService = inject(ProductsService)
  perPage = signal(5)
  search = signal('')

  optionsPerPage = [
    5, 10, 20
  ]

  filtered = computed( () => {
    const searchText = this.search().toLowerCase().trim()
    if ( !searchText ) return this.productService.products().slice(  0,  this.perPage())
    return this.productService.products().filter( item => {
      return `${item.id.toLowerCase()} ${item.name.toLowerCase()}`.includes(searchText)
    }).slice(  0,  this.perPage())
  })

  onSetPerPage( count: string ) {
    this.perPage.set(Number(count))
  }

  isLoading( ) {
    return this.loading
  }

  getTotals() {
    const count = this.filtered().length
    if ( count === 1) return `${count} Resultado`
    return `${count} Resultados`
  }

}
