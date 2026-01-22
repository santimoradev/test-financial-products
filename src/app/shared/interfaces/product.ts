import { FormControl } from "@angular/forms"

export interface ProductsResponse {
  data: ProductDTO[]
}

export interface ProductResponse extends ProductDTO {}
export interface ProductDTO {
  id: string
  name: string
  description: string
  logo: string
  date_release: string
  date_revision: string
}

export type ProductForm = {
  id: FormControl<string>;
  name: FormControl<string>;
  description: FormControl<string>;
  logo: FormControl<string>;
  date_release: FormControl<string>;
  date_revision: FormControl<string>;
};


export type CreateProductRequest = Required<ProductDTO>
export interface UpdateProductRequest extends Omit<CreateProductRequest, 'id'> {}


export interface CreateProductResponse {
  data: ProductDTO
  message: string
}
