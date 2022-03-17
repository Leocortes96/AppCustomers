import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let httpClientSpy: {get: jasmine.Spy}
  let service: ApiService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({});
    service = new ApiService(httpClientSpy as any);
  });

  it('HttpClient called once', () => {
    const expectedClients  = [
      {
        "name": "Lorena",
        "last_name": "Rodrigez",
        "id_document_type": 1,
        "document_number": "1053847584",
        "business_name": "Azure",
        "id_providers": 2,
        "sales_last_year": 8000000
      }
    ];
    httpClientSpy.get.and.returnValue(of(expectedClients));

    service.getClient();

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('Should return clients', () =>{

    const expectedClients = {
        "name": "Lorena",
        "last_name": "Rodrigez",
        "id_document_type": 1,
        "document_number": "1053847584",
        "business_name": "Azure",
        "id_providers": 2,
        "sales_last_year": 8000000
      };

    httpClientSpy.get.and.returnValue(of(expectedClients));
    service.getClient().subscribe(customer => {
      expect(customer.name).toBe('Lorena');
      expect(customer).toEqual(expectedClients);
    });
  });

  it('Should return DocumentType', () =>{

    const expectedDocument = {
        "id": 1,
        "reference": "CC",
        "name": "Cedula"
      };

    httpClientSpy.get.and.returnValue(of(expectedDocument));
    service.getDocumentType().subscribe(document => {
      expect(document.reference).toBe('CC');
      expect(document).toEqual(expectedDocument);
    });
  });

  it('Should return Providers', () =>{

    const expectedProviders = {
        "id": 1,
        "name": "Google",
        "description": "Google description"
      };

    httpClientSpy.get.and.returnValue(of(expectedProviders));
    service.getProviders().subscribe(provider => {
      expect(provider.name).toBe('Google');
      expect(provider).toEqual(expectedProviders);
    });
  });
});
