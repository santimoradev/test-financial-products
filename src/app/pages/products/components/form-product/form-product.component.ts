import { Component, computed, inject, input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'form-product',
  styleUrl: './form-product.component.scss',
  templateUrl: 'form-product.component.html',
  imports: [ DatePipe, ReactiveFormsModule ]
})

export class FormProductComponent  implements OnInit  {
  private fb = inject(FormBuilder)
  minDate: string = new Date().toISOString().slice(0, 10);

  form = this.fb.group({
    // TODO: verificar ID del producto que no exista antes de crearlo
    id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)] ],
    name: ['', [ Validators.required, Validators.minLength(5), Validators.maxLength(100) ] ],
    description: ['', [ Validators.required, Validators.minLength(10), Validators.maxLength(200) ] ],
    logo: ['', Validators.required ],
    date_release: ['', Validators.required ],
    date_revision: [{value: '', disabled: true }],
  })

  ngOnInit(): void {
    this.onReleaseDateChange();
  }


  onReleaseDateChange(): void {
    this.form.get('date_release')?.valueChanges.subscribe(value => {
      if (value) {
        // TODO: date fns or dayjs
        const releaseDate = new Date(value);
        const revisionDate = new Date(releaseDate);
        revisionDate.setFullYear(releaseDate.getFullYear() + 1);
        const formattedDate = revisionDate.toISOString().split('T')[0];
        this.form.controls.date_revision.setValue(formattedDate);
      }
    });
  }

  reset() {
    this.form.reset();
  }

  onSubmit() {
    console.log(this.form.invalid)
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);
  }
}
