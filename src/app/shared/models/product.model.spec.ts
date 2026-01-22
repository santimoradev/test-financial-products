import { Product } from './product.model';
import { ProductDTO } from '../interfaces/product';

describe('Product Model', () => {
  const mockDto: ProductDTO = {
    id: 'sm-92',
    name: 'Tarjeta de Crédito',
    description: 'Una tarjeta básica',
    logo: 'logo.png',
    date_release: '2026-01-21',
    date_revision: '2027-01-21'
  };

  it('should create an instance via constructor', () => {
    const date = new Date();
    const product = new Product('sm-92', 'Tarjeta de Crédito', 'Una tarjeta básica', 'logo.png', date, date);

    expect(product.id).toBe('sm-92');
    expect(product.name).toBe('Tarjeta de Crédito');
    expect(product instanceof Product).toBe(true);
  });

  it('should map correctly from DTO using fromDTO()', () => {
    const product = Product.fromDTO(mockDto);

    expect(product.id).toBe(mockDto.id);
    expect(product.name).toBe(mockDto.name);
    expect(product.dateRelease instanceof Date).toBe(true);
    expect(product.dateRelease.getFullYear()).toBe(2026);
  });

  it('should return the correct releaseYear', () => {
    const product = Product.fromDTO(mockDto);
    expect(product.releaseYear).toBe(2026);
  });

  it('should create a CreateProductRequest using createFromJson()', () => {
    const partialDto: Partial<ProductDTO> = {
      id: 'sm-92',
      name: 'Tarjeta de Crédito'
    };

    const request = Product.createFromJson(partialDto);

    expect(request.id).toBe('sm-92');
    expect(request.name).toBe('Tarjeta de Crédito');
    expect(request.description).toBe('undefined');
  });

});
