import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { HomeState } from './home-page.state';

@Component({
  selector: 'home-page-component',
  styleUrl: './home-page.component.scss',
  templateUrl: 'home-page.component.html',
  imports: [
    ProductListComponent,
    RouterLink,
    PaginationComponent
  ],
  providers: [
    HomeState
  ]
})

export class HomePageComponent implements OnInit  {
  state = inject(HomeState)

  ngOnInit(): void {
    this.state.productService.getRows();
  }
}
