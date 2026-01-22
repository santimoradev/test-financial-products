import { Component, input, output } from '@angular/core';

@Component({
  selector: 'pagination-bp',
  styleUrl: './pagination.component.scss',
  templateUrl: 'pagination.component.html'
})

export class PaginationComponent {
  total = input.required<number>()
  page = input.required<number>()

  onChangePage = output<number>()

  isFirstPage() {
    return this.page() <= 1
  }
  isLastPage() {
    return this.total() <= this.page()
  }
  goPrev( ){
    if ( this.isFirstPage() ) return
    this.onChangePage.emit( this.page() - 1 )
  }

  goNext( ){
    if ( this.isLastPage() ) return
    this.onChangePage.emit( this.page() + 1)
  }
}
