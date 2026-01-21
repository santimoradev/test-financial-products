import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormProductComponent } from '../components/form-product/form-product.component';

@Component({
  selector: 'create-product',
  styleUrl: './create-product.component.scss',
  templateUrl: 'create-product.component.html',
  imports: [ FormProductComponent ]
})

export class CreateProductComponent {

}
