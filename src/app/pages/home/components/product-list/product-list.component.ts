import { Component, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Product } from '@shared/models/product.model';
import { SpinnerComponent } from '@shared/components/ui/spinner/spinner.component';
import { ProductListState } from './product-list.state';
import { ProductDeleteModalComponent } from '../product-delete/product-delete.component';

@Component({
  selector: 'product-list',
  styleUrl: './product-list.component.scss',
  templateUrl: 'product-list.component.html',
  imports: [ ProductDeleteModalComponent, DatePipe, SpinnerComponent ],
  providers: [
    ProductListState
  ]
})

export class ProductListComponent {
  state = inject(ProductListState)
  items = input.required<Product[]>()
}
