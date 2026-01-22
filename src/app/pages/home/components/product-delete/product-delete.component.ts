import { Component, input, output} from '@angular/core';
import { ButtonBpComponent } from '@shared/components/ui/button/button.component';
import { Product } from '@shared/models/product.model';

@Component({
  selector: 'product-delete',
  styleUrl: './product-delete.component.scss',
  templateUrl: 'product-delete.component.html',
  imports: [
    ButtonBpComponent
  ]
})

export class ProductDeleteModalComponent {
  onConfirmDelete = output();
  onCancelDelete = output();
  product = input<Product | null>();
}
