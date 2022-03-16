import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postClient(data: any){
    return this.http.post<any>("https://localhost:44333/api/customers/", data);
  }
  
  getClient(){
    return this.http.get<any>("https://localhost:44333/api/customers/");
  }
  getDocumentType(){
    return this.http.get<any>("https://localhost:44333/api/document_type/");
  }
  getProviders(){
    return this.http.get<any>("https://localhost:44333/api/providers/");
  }
  putClient(data: any, id: number){
    return this.http.put<any>("https://localhost:44333/api/customers/"+id, data);
  }
  deleteClient(id: number){
    return this.http.delete<any>("https://localhost:44333/api/customers/"+id);
  }
}
