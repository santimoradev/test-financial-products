import { computed, inject, Injectable, signal } from "@angular/core";
import { ProductsService } from "@shared/services/products.service";

@Injectable()
export class HomeState {
  productService = inject(ProductsService)
  currentPage = signal(1)
  perPage = signal(5)
  search = signal('')

  optionsPerPage = [
    5, 10, 20
  ]

  items = computed( () => {
    const searchText = this.search().toLowerCase().trim()
    if ( !searchText ) return this.productService.products()
    return this.productService.products().filter( item => {
      return `${item.id.toLowerCase()} ${item.name.toLowerCase()}`.includes(searchText)
    })
  })

  filtered = computed( () => {
    const from =  ( this.currentPage() - 1 ) * this.perPage()
    const to = from + this.perPage()
    return this.items().slice(  from,  to)
  })

  totalPages = computed( () =>  Math.ceil( this.items().length  / this.perPage() ) )

  onSearchText( value: string) {
    this.search.set(value)
    this.currentPage.set( 1 )

  }
  changePage( page: number ) {
    this.currentPage.set( page )
  }
  onSetPerPage( count: string ) {
    this.perPage.set(Number(count))
    this.currentPage.set( 1 )
  }

  getTotals() {
    const count = this.filtered().length
    if ( count === 1) return `${count} Resultado`
    return `${count} Resultados`
  }

}
