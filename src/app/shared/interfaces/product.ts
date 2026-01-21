export interface ProductsResponse {
  data: ProductDTO[]
}

export interface ProductDTO {
  id: string
  name: string
  description: string
  logo: string
  date_release: string
  date_revision: string
}
