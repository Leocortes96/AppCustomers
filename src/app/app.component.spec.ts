import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';

describe('AppComponent', () => {
  let httpClientSpy: {get: jasmine.Spy}
  let service: ApiService;
  let appComponent: AppComponent;

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new ApiService(httpClientSpy as any);
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, MatDialogModule, HttpClient
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  // it('should return an error when the server return a 404', () => {
  //   const errorResponse = new HttpErrorResponse({
  //     error: 'test 404 error',
  //     status: 404,
  //     statusText: 'Not Found'
  //   });

  //   httpClientSpy.get.and.returnValue(of(errorResponse));
  //   appComponent.getAllDocumentType();
  //   var doc = appComponent.documentType;
  //   service.getDocumentType();
    
  //   expect(doc).toBeFalsy();
  // });
});
