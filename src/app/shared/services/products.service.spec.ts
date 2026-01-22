import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '@envs/environment';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/bp/products`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch product list and update signals', async () => {
    const mockResponse = {
      data: [
        {
          id: 'sm-92',
          name: 'Tarjeta de Crédito',
          description: 'Una tarjeta básica',
          logo: 'logo.png',
          date_release: '2026-01-21',
          date_revision: '2027-01-21'
        }
      ]
    };

    const promise = service.getRows();

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);

    await promise;

    expect(service.products().length).toBe(1);
    expect(service.totals()).toBe(1);
    expect(service.isLoading()).toBe(false);
  });

  it('should verify product ID existence', async () => {
    const productId = 'sm-92';

    const promise = service.verificationId(productId);

    const req = httpMock.expectOne(`${apiUrl}/verification/${productId}`);
    req.flush(true);

    const result = await promise;
    expect(result).toBe(true);
    expect(service.isLoading()).toBe(false);
  });

  it('should send a POST request when saving a product', async () => {
    const newProduct = {
      id: 'sm-92',
      name: 'Tarjeta de Crédito',
      description: 'Una tarjeta básica',
      logo: 'logo.png',
      date_release: '2026-01-21',
      date_revision: '2027-01-21'
    };

    service.save(newProduct).then();

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newProduct);

    req.flush({ message: 'Product added successfully' });
  });

  it('should fetch a single product by id and update the product signal', async () => {
    const mockProductResponse = {
      id: 'sm-92',
      name: 'Tarjeta de Crédito',
      description: 'Una tarjeta básica',
      logo: 'logo.png',
      date_release: '2026-01-21',
      date_revision: '2027-01-21'
    };
    const productId = 'sm-92';

    const promise = service.getById(productId);

    const req = httpMock.expectOne(`${apiUrl}/${productId}`);
    expect(req.request.method).toBe('GET');

    req.flush(mockProductResponse);

    const result = await promise;

    expect(result).toEqual(mockProductResponse);
    expect(service.product()).toEqual(mockProductResponse);
    expect(service.isLoading()).toBe(false);
  });

  it('should send a PUT request when updating a product', async () => {
      const updatePayload = {
        id: 'sm-92',
        name: 'Tarjeta de Crédito',
        description: 'Una tarjeta básica',
        logo: 'logo.png',
        date_release: '2026-01-21',
        date_revision: '2027-01-21'
      };
      const { id, ...expectedBody } = updatePayload;

      const promise = service.update(updatePayload);

      const req = httpMock.expectOne(`${apiUrl}/${id}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(expectedBody);

      req.flush({ message: 'Product updated successfully' });
      await promise;
    });

    it('should send a DELETE request when deleting a product', async () => {
      const productId = 'sm-92';

      const promise = service.delete(productId);

      const req = httpMock.expectOne(`${apiUrl}/${productId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ message: 'Product removed successfully' });
      const result = await promise;

      expect(result).toBeDefined();
    });
});
