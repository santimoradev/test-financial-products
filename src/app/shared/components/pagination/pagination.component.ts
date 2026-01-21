import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'pagination-component',
  styleUrl: './pagination.component.scss',
  templateUrl: 'pagination.component.html'
})

export class PaginationComponent {
  total = input.required<number>()
  currentPage = signal<number>(1)
}
