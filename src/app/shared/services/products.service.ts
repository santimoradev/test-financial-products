import { computed, inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ProductsResponse } from "@shared/interfaces/product";
import { environment } from "@envs/environment";
import { Product } from "../models/product.model";

@Injectable({ providedIn: 'root' })

export class ProductsService   {
  private readonly apiUrl = `${environment.apiUrl}/bp/products`
  private http = inject(HttpClient)

  totals = computed( () => this.products().length )

  products = signal<Product[]>([])
  isLoading = signal<boolean>(true)

  constructor() {
    this.getRows();
  }
  getRows() {
    this.http.get<ProductsResponse>(this.apiUrl)
      .subscribe( (resp) => {
        const products = resp.data.map( Product.fromDTO )
        this.products.set(products)
        this.isLoading.set(false)
      })
  }
}
