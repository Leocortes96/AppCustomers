import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDocumentType } from '../../models/documentType.model';
import { IProviders } from '../../models/providers.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  public clientForm !: FormGroup;
  public actionBtn: string = "Save";
  public documentType: IDocumentType[] = [];
  public providers: IProviders[] = [];

  private pattern = '^[0-9]{10}$';

  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      id_document_type: ['', Validators.required],
      document_number: ['', [Validators.required, Validators.pattern(this.pattern)]],
      business_name: ['', Validators.required],
      id_providers: ['', Validators.required],
      sales_last_year: ['', Validators.required]
    })
    this.getAllDocumentType();
    this.getAllProviders();
    if(this.editData){
      this.actionBtn = "Update";
      this.clientForm.controls['name'].setValue(this.editData.name);
      this.clientForm.controls['last_name'].setValue(this.editData.last_name);
      this.clientForm.controls['id_document_type'].setValue(this.editData.id_document_type);
      this.clientForm.controls['document_number'].setValue(this.editData.document_number);
      this.clientForm.controls['business_name'].setValue(this.editData.business_name);
      this.clientForm.controls['id_providers'].setValue(this.editData.id_providers);
      this.clientForm.controls['sales_last_year'].setValue(this.editData.sales_last_year);
    }
  }

  public addClient(): void{
    if (!this.editData){
      if(this.clientForm.valid){
        this.api.postClient(this.clientForm.value).subscribe({
          next:(res)=> {
            this.clientForm.reset();
            this.dialogRef.close('save');
          },
          error:()=> {
            alert("Error while adding client")
          }
        })
      }
    }else {
      this.updateClient();
    }
  }

  private updateClient(): void{
    let client: any =  {
      id: this.editData.id,
      name: this.clientForm.value.name,
      last_name: this.clientForm.value.last_name,
      id_document_type: this.clientForm.value.id_document_type,
      document_number: this.clientForm.value.document_number,
      business_name: this.clientForm.value.business_name,
      id_providers: this.clientForm.value.id_providers,
      sales_last_year: this.clientForm.value.sales_last_year
    }
    this.api.putClient(client, this.editData.id).subscribe({
      next:(res) =>{
        this.clientForm.reset();
        this.dialogRef.close('update');
      },
      error: ()=>{
        alert("Error Updating the record!!");
      }
    });
  }
  private getAllDocumentType(): void{
    this.api.getDocumentType().subscribe({
      next:(res)=> {
        this.documentType = res;
      },
      error:(err)=> {
        alert("error while fetching the records!!")
      }
    })
  }
  private getAllProviders(): void{
    this.api.getProviders().subscribe({
      next:(res)=> {
        this.providers = res;
      },
      error:(err)=> {
        alert("error while fetching the records!!")
      }
    })
  }
}
