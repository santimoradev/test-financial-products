import { computed, inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { environment } from "@envs/environment";

import {
  CreateProductRequest, CreateProductResponse, ProductDTO, ProductResponse, ProductsResponse
} from "@shared/interfaces/product";
import { Product } from "@shared/models/product.model";

@Injectable({ providedIn: 'root' })

export class ProductsService {
  private readonly apiUrl = `${environment.apiUrl}/bp/products`
  private http = inject(HttpClient)

  totals = computed( () => this.products().length );
  product = signal<ProductDTO | null>(null);
  products = signal<Product[]>([]);
  isLoading = signal<boolean>(true);

  async getRows() {
    this.isLoading.set(true)

    const response = await firstValueFrom(
      this.http.get<ProductsResponse>(this.apiUrl)
    )
    const products = response.data
      .map(Product.fromDTO)
      .reverse()

    this.products.set(products)
    this.isLoading.set(false)
  }

  async getById(productId: string) {
    this.isLoading.set(true)

    const response = await firstValueFrom(
      this.http.get<ProductResponse>(`${this.apiUrl}/${productId}`)
    )
    this.product.set(response)
    this.isLoading.set(false)
    return response

  }

  async verificationId(productId: string) {
    this.isLoading.set(true)
    const response = await firstValueFrom(
      this.http.get<boolean>(`${this.apiUrl}/verification/${productId}`)
    )
    this.isLoading.set(false)
    return response
  }
  async save(payload: CreateProductRequest) {
    return await firstValueFrom(
      this.http.post<CreateProductResponse>(this.apiUrl, payload)
    )
  }
  async update(payload: ProductDTO) {
    const { id, ...rest } = payload
    return await firstValueFrom(
      this.http.put<CreateProductResponse>(`${this.apiUrl}/${id}`, rest)
    )
  }
  async delete(productId: string) {
    return await firstValueFrom(
      this.http.delete<CreateProductResponse>(`${this.apiUrl}/${productId}`)
    )
  }
}
