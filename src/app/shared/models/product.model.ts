import { CreateProductRequest, ProductDTO } from "../interfaces/product";

export class Product {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly logo: string,
    public readonly dateRelease: Date,
    public readonly dateRevision: Date
  ) {}

  get releaseYear(): number {
    return this.dateRelease.getFullYear();
  }

  static fromDTO(dto: ProductDTO): Product {
    return new Product(
      dto.id,
      dto.name,
      dto.description,
      dto.logo,
      new Date(dto.date_release + 'T00:00:00'),
      new Date(dto.date_revision + 'T00:00:00')
    );
  }
  static createFromJson(dto: Partial<ProductDTO>) : CreateProductRequest {
    return {
      id: `${dto.id}`,
      name: `${dto.name}`,
      description: `${dto.description}`,
      logo: `${dto.logo}`,
      date_release: `${dto.date_release}`,
      date_revision: `${dto.date_revision}`,
    }
  }
}
