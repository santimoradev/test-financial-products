import { ProductDTO } from "../interfaces/product";

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
      new Date(dto.date_release),
      new Date(dto.date_revision)
    );
  }
}
