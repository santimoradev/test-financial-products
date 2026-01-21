import { Component, input } from '@angular/core';
import { Product } from '@/app/shared/models/product.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'product-list',
  styleUrl: './product-list.component.scss',
  templateUrl: 'product-list.component.html',
  imports: [ DatePipe ]
})

export class ProductListComponent {

  items = input.required<Product[]>()

}
