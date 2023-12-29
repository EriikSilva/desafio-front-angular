import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostUserDTO, PutUserDTO } from './DTO/crudDTO';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private readonly apiUrl = environment.apiUrl

  constructor(private http:HttpClient) { }

  getUsuarios():Observable<any>{
    return this.http.get(`${this.apiUrl}/Usuario`);
  }

  postUsuarios(body:PostUserDTO):Observable<PostUserDTO>{
    return this.http.post<PostUserDTO>(`${this.apiUrl}/Usuario`, body);
  }

  editUsuarios(body:PutUserDTO):Observable<PutUserDTO>{
    return this.http.put<PutUserDTO>(`${this.apiUrl}/Usuario`, body)
  }

  deleteUsuarios(id:number):Observable<number>{
    return this.http.delete<number>(`${this.apiUrl}/Usuario?id=${id}`)
  }
}
