import { ProductsService } from '@/app/shared/services/products.service';
import { Component, computed, inject } from '@angular/core';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HomeState } from './home-page.state';

@Component({
  selector: 'home-page-component',
  styleUrl: './home-page.component.scss',
  templateUrl: 'home-page.component.html',
  imports: [
    ProductListComponent,
  ],
  providers: [
    HomeState
  ]
})

export class HomePageComponent {
  state = inject(HomeState)


}
