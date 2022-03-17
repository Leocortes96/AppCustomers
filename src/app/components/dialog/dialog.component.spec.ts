import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, HttpClientModule, MatDialogModule, MAT_DIALOG_DATA,RouterTestingModule, MatDialogRef],
      declarations: [ DialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  // it('Should valid', () => {

  //   expect(component.clientForm.valid).toBeFalsy();
  // })

  // it('Should set the variables of component', () =>{
  //   const expectedClients  = {
  //       "name": "Lorena",
  //       "last_name": "Rodrigez",
  //       "id_document_type": 1,
  //       "document_number": "1053847584",
  //       "business_name": "Azure",
  //       "id_providers": 2,
  //       "sales_last_year": 8000000
  //     };
  //   const spy = spyOn((component as any).api.getClient, 'getClient').and.returnValue(of(expectedClients));
    
  //   component.clientForm.controls['name'].setValue('Leonardo');

  //   expect(component.clientForm.value.name).toEqual('Leonardo');
  // });

  
});
