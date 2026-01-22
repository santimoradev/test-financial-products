import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home-page.component';
import { MainLayoutComponent } from './layouts/main/main-layout.component';
import { CreateProductComponent } from './pages/products/create-product/create-product.component';
import { EditProductComponent } from './pages/products/edit-product/edit-product.component';
import { productByIdResolver } from './pages/products/edit-product/edit-product.resolver';

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
      },
      {
        path: 'products/:id',
        component: EditProductComponent,
        resolve: {
          product: productByIdResolver
        }
      }
    ]
  }
];
