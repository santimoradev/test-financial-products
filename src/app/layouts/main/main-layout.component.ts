import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@shared/components/header/header.component';

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
