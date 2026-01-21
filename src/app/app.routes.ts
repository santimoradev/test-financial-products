import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home-page.component';
import { MainLayoutComponent } from './layouts/main/main-layout.component';
import { CreateProductComponent } from './pages/products/create-product/create-product.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
      {
        path: 'agregar-producto',
        component: CreateProductComponent,
      }
    ]
  }
];
