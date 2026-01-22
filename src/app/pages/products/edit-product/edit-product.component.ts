import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormProductComponent } from '../components/form-product/form-product.component';
import { EditProductState } from './edit-product.state';

@Component({
  selector: 'edit-product',
  styleUrl: './edit-product.component.scss',
  templateUrl: 'edit-product.component.html',
  imports: [ FormProductComponent ],
  providers: [
    EditProductState
  ]
})

export class EditProductComponent  {
  router = inject(Router)
  state = inject(EditProductState)

}
