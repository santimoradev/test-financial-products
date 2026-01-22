import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'header-component',
  styleUrl: './header.component.scss',
  templateUrl: 'header.component.html',
  imports: [
    RouterLink
  ]
})

export class HeaderComponent {}
