import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'main-layout-component',
  styleUrl: './main-layout.component.scss',
  templateUrl: 'main-layout.component.html',
  imports: [
    HeaderComponent,
    RouterOutlet,
  ]
})

export class MainLayoutComponent {}
