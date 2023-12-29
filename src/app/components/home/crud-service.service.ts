import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private readonly apiUrl = environment.apiUrl

  constructor(private http:HttpClient) { }

  getUsuarios():Observable<any>{
    return this.http.get(`${this.apiUrl}/Usuario`);
  }

  postUsuarios(body:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/Usuario`, body);
  }

  editUsuarios(body:any):Observable<any>{
    return this.http.put(`${this.apiUrl}/Usuario`, body)
  }

  deleteUsuarios(id:any):Observable<any>{
    return this.http.delete(`${this.apiUrl}/Usuario?id=${id}`)
  }
}
