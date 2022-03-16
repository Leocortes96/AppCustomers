import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { IDocumentType } from './models/documentType.model';
import { IProviders } from './models/providers.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'last_name', 'id_document_type', 'document_number', 'business_name', 'id_providers', 'sales_last_year', 'action'];
  public dataSource!: MatTableDataSource<any>;
  public documentType: IDocumentType[] = [];
  public providers: IProviders[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog, private api: ApiService){ }

  ngOnInit(): void {
    this.getAllClients();
    this.getAllDocumentType();
    this.getAllProviders();
  }

  public refDocumentType(id: number): string{
    return this.documentType.find(x=> x.id === id)?.reference || '';
  }
  public refProviders(id: number): string{
    return this.providers.find(x=> x.id === id)?.name || '';
  }
  public openDialog(): void{
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(value =>{
      if(value === 'save'){
        this.getAllClients()
      }
    })
  }
  public editClient(element: any): void{
    this.dialog.open(DialogComponent,{
      width: '30%',
      data: element
    }).afterClosed().subscribe(value =>{
      if(value === 'update'){
        this.getAllClients()
      }
    })
  }
  public deletedClient(id: number): void{
    this.api.deleteClient(id).subscribe({
      next:(res)=>{
        this.getAllClients();
      },
      error:()=>{
        alert("error while deleting the client!!")
      }      
    })
  }
  public applyFilter(event: Event): void{
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if (this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }
  private getAllClients(): void{
    this.api.getClient().subscribe({
      next:(res)=> {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      },
      error:(err)=> {
        alert("error while fetching the records!!")
      }
    })
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
