import { Component, effect, inject, input, OnInit, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '@shared/models/product.model';
import { CreateProductRequest, ProductDTO, } from '@shared/interfaces/product';
import { ButtonBpComponent } from '@shared/components/ui/button/button.component';
import { ProductsService } from '@shared/services/products.service';

@Component({
  selector: 'form-product',
  styleUrl: './form-product.component.scss',
  templateUrl: 'form-product.component.html',
  imports: [ RouterLink, ReactiveFormsModule, ButtonBpComponent ]
})

export class FormProductComponent  {
  private fb = inject(FormBuilder)
  onSubmitForm = output<CreateProductRequest>();
  newRecord = input<boolean>(false)
  formData = input<ProductDTO | null>()

  productService = inject(ProductsService)

  minDate: string = new Date().toISOString().slice(0, 10);


  form = this.fb.nonNullable.group({
    id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    name: ['',[ Validators.required, Validators.minLength(5), Validators.maxLength(100) ]],
    description: ['',[ Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    logo: ['', Validators.required ],
    date_release: ['', Validators.required ],
    date_revision: ['', [Validators.required]],
  })


  constructor() {
    effect(() => {
      const formData = this.formData()
      if (formData) {
        this.form.patchValue({
          id: formData.id,
          name: formData.name,
          description: formData.description,
          logo: formData.logo,
          date_release: formData.date_release,
          date_revision: formData.date_revision,
        })
        this.form.get('id')?.disable();
      }
    })
  }
  onChangeRevision() {
    const value = this.form.get('date_release')?.value
      if (value) {
        const releaseDate = new Date(value);
        const revisionDate = new Date(releaseDate);
        revisionDate.setFullYear(releaseDate.getFullYear() + 1);
        const formattedDate = revisionDate.toISOString().split('T')[0];
        this.form.controls.date_revision.setValue(formattedDate);
      }
  }

  async onVerificateId() {
    const value = this.form.get('id')?.value
      if ( value && this.newRecord() ) {
        const hasDuplicate = await this.productService.verificationId(value)
        if ( hasDuplicate ) {
          this.form.get('id')?.setErrors({ 'duplicate': true })
        }
      }
  }
  reset() {
    this.form.reset();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const product = Product.createFromJson(this.form.getRawValue());
    this.onSubmitForm.emit(product);
    this.form.reset()
  }
}
